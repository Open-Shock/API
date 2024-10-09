﻿using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenShock.API.Models.Response;
using OpenShock.Common.Models;
using OpenShock.Common.Problems;

namespace OpenShock.API.Controller.Shockers;

public sealed partial class ShockerController
{
    /// <summary>
    /// List all shockers belonging to the authenticated user.
    /// </summary>
    /// <response code="200">The shockers were successfully retrieved.</response>
    [HttpGet("own")]
    [ProducesSuccess<IEnumerable<ResponseDeviceWithShockers>>]
    [MapToApiVersion("1")]
    public async Task<BaseResponse<IEnumerable<ResponseDeviceWithShockers>>> ListShockers()
    {
        var shockers = await _db.Devices.Where(x => x.Owner == CurrentUser.DbUser.Id).OrderBy(x => x.CreatedOn).Select(
            x => new ResponseDeviceWithShockers
            {
                Id = x.Id,
                Name = x.Name,
                CreatedOn = x.CreatedOn,
                Shockers = x.Shockers.OrderBy(y => y.CreatedOn).Select(y => new ShockerResponse
                {
                    Id = y.Id,
                    Name = y.Name,
                    RfId = y.RfId,
                    CreatedOn = y.CreatedOn,
                    Model = y.Model,
                    IsPaused = y.Paused
                })
            }).ToListAsync();

        return new BaseResponse<IEnumerable<ResponseDeviceWithShockers>>
        {
            Data = shockers
        };
    }
}