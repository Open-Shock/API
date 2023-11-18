﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenShock.API.Models.Response;
using OpenShock.Common.Models;
using System.Net;

namespace OpenShock.API.Controller.Devices;

partial class DevicesController
{
    [HttpGet("{id:guid}/shockers")]
    public async Task<BaseResponse<IEnumerable<ShockerResponse>>> GetShockers(Guid id)
    {
        var deviceExists = await _db.Devices.AnyAsync(x => x.Owner == CurrentUser.DbUser.Id && x.Id == id);
        if (!deviceExists) return EBaseResponse<IEnumerable<ShockerResponse>>("Device does not exists or you do not have access to it.", HttpStatusCode.NotFound);
        var shockers = await _db.Shockers.Where(x => x.Device == id).Select(x => new ShockerResponse()
        {
            Id = x.Id,
            Name = x.Name,
            RfId = x.RfId,
            CreatedOn = x.CreatedOn,
            Model = x.Model,
            IsPaused = x.Paused
        }).ToListAsync();
        return new BaseResponse<IEnumerable<ShockerResponse>>
        {
            Message = "Successfully created shocker",
            Data = shockers
        };
    }
}