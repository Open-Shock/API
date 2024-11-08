﻿using System.Net;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenShock.API.Models.Response;
using OpenShock.Common.Errors;
using OpenShock.Common.Models;
using OpenShock.Common.Problems;
using OpenShock.Common.Utils;

namespace OpenShock.API.Controller.Shares;

public sealed partial class SharesController
{
    [HttpGet]
    [ProducesSlimSuccess<IEnumerable<GenericIni>>]
    [ApiVersion("2")]
    public async Task<IEnumerable<GenericIni>> GetSharesByUsers()
    {
        var sharedToUsers = await _db.ShockerShares.Where(x => x.Shocker.DeviceNavigation.Owner == CurrentUser.DbUser.Id)
            .Select(x => new GenericIni
            {
                Id = x.SharedWithNavigation.Id,
                Image = x.SharedWithNavigation.GetImage(),
                Name = x.SharedWithNavigation.Name
            }).OrderBy(x => x.Name).Distinct().ToListAsync();
        return sharedToUsers;
    }
    
    [HttpGet("{userId:guid}")]
    [ProducesSlimSuccess<ShareInfo>]
    [ProducesProblem(HttpStatusCode.NotFound, "UserNotFound")]
    [ApiVersion("2")]
    public async Task<IActionResult> GetSharesToUser(Guid userId)
    {
        var sharedWithUser = await _db.ShockerShares.Where(x => x.Shocker.DeviceNavigation.Owner == CurrentUser.DbUser.Id && x.SharedWith == userId)
            .Select(x => new UserShareInfo
            {
                Id = x.Shocker.Id,
                Name = x.Shocker.Name,
                CreatedOn = x.CreatedOn,
                Permissions = new ShockerPermissions
                {
                    Sound = x.PermSound,
                    Vibrate = x.PermVibrate,
                    Shock = x.PermShock,
                    Live = x.PermLive
                },
                Limits = new ShockerLimits
                {
                    Duration = x.LimitDuration,
                    Intensity = x.LimitIntensity
                },
                Paused = x.Paused
            }).ToListAsync();
        
        if(sharedWithUser.Count == 0)
        {
            return Problem(ShareError.ShareGetNoShares);
        }
        
        return Ok(sharedWithUser);
    }
}