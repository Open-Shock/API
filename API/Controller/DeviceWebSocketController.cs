﻿using System.Net.WebSockets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using OpenShock.API.Realtime;
using OpenShock.Common.Models.WebSocket;
using OpenShock.Common.Models.WebSocket.Device;
using OpenShock.Common.Redis;
using OpenShock.ServicesCommon.Authentication;
using OpenShock.ServicesCommon.Authentication.Services;
using OpenShock.ServicesCommon.Utils;
using OpenShock.ServicesCommon.Websocket;
using Redis.OM.Contracts;
using Redis.OM.Searching;
using Semver;

namespace OpenShock.API.Controller;

[ApiController]
[Authorize(AuthenticationSchemes = OpenShockAuthSchemas.DeviceToken)]
[Route("/{version:apiVersion}/ws/device")]
public sealed class DeviceWebSocketController : WebsocketBaseController<IBaseResponse<ResponseType>>, IActionFilter
{
    private DateTimeOffset _connected = DateTimeOffset.UtcNow;
    private readonly IRedisCollection<DeviceOnline> _devicesOnline;
    private readonly IRedisConnectionProvider _redis;

    public override int MaxChunkSize => 4096;
    
    private Common.OpenShockDb.Device _currentDevice = null!;

    [NonAction]
    public void OnActionExecuting(ActionExecutingContext context)
    {
        _currentDevice = ControllerContext.HttpContext.RequestServices.GetRequiredService<IClientAuthService<Common.OpenShockDb.Device>>()
            .CurrentClient;
    }

    [NonAction]
    public void OnActionExecuted(ActionExecutedContext context)
    {
    }

    public override Guid Id => _currentDevice.Id;

    public DeviceWebSocketController(ILogger<DeviceWebSocketController> logger, IHostApplicationLifetime lifetime,
        IRedisConnectionProvider redisConnectionProvider) : base(logger, lifetime)
    {
        _redis = redisConnectionProvider;
        _devicesOnline = redisConnectionProvider.RedisCollection<DeviceOnline>(false);
    }
    
    protected override Task RegisterConnection()
    {
        _connected = DateTimeOffset.UtcNow;
        
        if (HttpContext.Request.Headers.TryGetValue("FirmwareVersion", out var header) &&
            SemVersion.TryParse(header, SemVersionStyles.Strict, out var version)) FirmwareVersion = version;

        WebsocketManager.DeviceWebSockets.RegisterConnection(this);
        
        return Task.CompletedTask;
    }
    
    protected override Task UnregisterConnection()
    {
        WebsocketManager.DeviceWebSockets.UnregisterConnection(this);
        return Task.CompletedTask;
    }

    protected override async Task Logic()
    {
        while(true)
        {
            try
            {
                if (WebSocket!.State == WebSocketState.Aborted) break;
                var message =
                    await JsonWebSocketUtils.ReceiveFullMessageAsyncNonAlloc<BaseRequest<RequestType>>(WebSocket,
                        Linked.Token);

                if (message.IsT2)
                {
                    if (WebSocket.State != WebSocketState.Open)
                    {
                        Logger.LogTrace("Client sent closure, but connection state is not open");
                        break;
                    }

                    try
                    {
                        await WebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Normal close",
                            Linked.Token);
                    }
                    catch (OperationCanceledException e)
                    {
                        Logger.LogError(e, "Error during close handshake");
                    }

                    Logger.LogInformation("Closing websocket connection");
                    break;
                }
                
                message.Switch(wsRequest =>
                    {
                        if (wsRequest == null) return;
                        Task.Run(() => ProcessResult(wsRequest));
                    },
                    failed => { Logger.LogWarning(failed.Exception, "Deserialization failed for websocket message"); },
                    _ => { });
            }
            catch (OperationCanceledException)
            {
                Logger.LogInformation("WebSocket connection terminated due to close or shutdown");
                break;
            }
            catch (WebSocketException e)
            {
                if (e.WebSocketErrorCode != WebSocketError.ConnectionClosedPrematurely)
                    Logger.LogError(e, "Error in receive loop, websocket exception");
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "Exception while processing websocket request");
            }
        }

        await Close.CancelAsync();
    }

    private async Task ProcessResult(BaseRequest<RequestType> json)
    {
        switch (json.RequestType)
        {
            case RequestType.KeepAlive:
                await SelfOnline();
                break;
        }
    }

    private async Task SelfOnline()
    {
        var deviceId = _currentDevice.Id.ToString();
        var online = await _devicesOnline.FindByIdAsync(deviceId);
        if (online == null)
        {
            await _devicesOnline.InsertAsync(new DeviceOnline
            {
                Id = _currentDevice.Id,
                Owner = _currentDevice.Owner,
                FirmwareVersion = FirmwareVersion,
                Gateway = null,
                ConnectedAt = _connected
            }, TimeSpan.FromSeconds(65));
            return;
        }

        if (online.FirmwareVersion != FirmwareVersion || online.ConnectedAt != _connected)
        {
            var changeTracker = _redis.RedisCollection<DeviceOnline>();
            var trackedDevice = await changeTracker.FindByIdAsync(deviceId);
            if (trackedDevice != null)
            {
                trackedDevice.FirmwareVersion = FirmwareVersion;
                trackedDevice.ConnectedAt = _connected;
                await changeTracker.SaveAsync();
                Logger.LogInformation("Updated firmware version of online device");
            }
            else Logger.LogWarning("Could not save changed firmware version to redis, device was not found in change tracker, this shouldn't be possible but it somehow was?");
        }

        await _redis.Connection.ExecuteAsync("EXPIRE",
            $"{typeof(DeviceOnline).FullName}:{_currentDevice.Id}", 65);
    }

    private SemVersion? FirmwareVersion { get; set; }
}