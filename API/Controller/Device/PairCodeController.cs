﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenShock.Common.Models;
using OpenShock.Common.Redis;
using Redis.OM;
using Redis.OM.Contracts;
using System.Net;

namespace OpenShock.API.Controller.Device;

partial class DeviceController
{
    [AllowAnonymous]
    [HttpGet("pair/{pairCode}")]
    [HttpGet("~/{version:apiVersion}/pair/{pairCode}")] // Backwards compatibility
    public async Task<BaseResponse<string>> Get([FromRoute] string pairCode, [FromServices] IRedisConnectionProvider redisProvider)
    {
        var devicePairs = redisProvider.RedisCollection<DevicePair>();

        var pair = await devicePairs.Where(x => x.PairCode == pairCode).SingleOrDefaultAsync();
        if (pair == null) return EBaseResponse<string>("No such pair code exists", HttpStatusCode.NotFound);
        await devicePairs.DeleteAsync(pair);

        var device = await _db.Devices.SingleOrDefaultAsync(x => x.Id == pair.Id);
        if (device == null) return EBaseResponse<string>("No such device exists for the pair code", HttpStatusCode.InternalServerError);

        return new BaseResponse<string>
        {
            Data = device.Token
        };
    }
}