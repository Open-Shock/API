﻿using System.Net;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenShock.API.Models.Requests;
using OpenShock.API.Services;
using OpenShock.Common.Models;
using OpenShock.ServicesCommon.Authentication.Attributes;
using OpenShock.ServicesCommon.Errors;
using OpenShock.ServicesCommon.Problems;

namespace OpenShock.API.Controller.Shockers;

public sealed partial class ShockerController
{
    /// <summary>
    /// Edit a shocker
    /// </summary>
    /// <param name="shockerId"></param>
    /// <param name="body"></param>
    /// <param name="deviceUpdateService"></param>
    /// <response code="200">Successfully updated shocker</response>
    /// <response code="404">Shocker does not exist</response>
    [HttpPatch("{shockerId}")]
    [TokenPermission(PermissionType.Shockers_Edit)]
    [ProducesSuccess]
    [ProducesProblem(HttpStatusCode.NotFound, "DeviceNotFound")]
    [ProducesProblem(HttpStatusCode.NotFound, "ShockerNotFound")]
    [MapToApiVersion("1")]
    public async Task<IActionResult> EditShocker(
        [FromRoute] Guid shockerId,
        [FromBody] NewShocker body, 
        [FromServices] IDeviceUpdateService deviceUpdateService)
    {
        var device = await _db.Devices.AnyAsync(x => x.Owner == CurrentUser.DbUser.Id && x.Id == body.Device);
        if (!device) return Problem(DeviceError.DeviceNotFound);

        var shocker = await _db.Shockers.Where(x => x.DeviceNavigation.Owner == CurrentUser.DbUser.Id && x.Id == shockerId)
            .SingleOrDefaultAsync();
        if (shocker == null) return Problem(ShockerError.ShockerNotFound);
        var oldDevice = shocker.Device;

        shocker.Device = body.Device;
        shocker.Name = body.Name;
        shocker.RfId = body.RfId;
        shocker.Model = body.Model;

        await _db.SaveChangesAsync();
        
        if (oldDevice != body.Device) 
            await deviceUpdateService.UpdateDeviceForAllShared(CurrentUser.DbUser.Id, oldDevice, DeviceUpdateType.ShockerUpdated);
        
        await deviceUpdateService.UpdateDeviceForAllShared(CurrentUser.DbUser.Id, body.Device, DeviceUpdateType.ShockerUpdated);
        
        return RespondSuccessSimple("Shocker updated successfully");
    }
}