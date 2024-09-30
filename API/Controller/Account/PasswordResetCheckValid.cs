﻿using Microsoft.AspNetCore.Mvc;
using System.Net;
using Asp.Versioning;
using OpenShock.API.Services.Account;
using OpenShock.ServicesCommon.Errors;
using OpenShock.ServicesCommon.Problems;

namespace OpenShock.API.Controller.Account;

public sealed partial class AccountController
{
    /// <summary>
    /// Check if a password reset is in progress
    /// </summary>
    /// <param name="passwordResetId">The id of the password reset</param>
    /// <param name="secret">The secret of the password reset</param>
    /// <param name="accountService"></param>
    /// <param name="cancellationToken"></param>
    /// <response code="200">Valid password reset process</response>
    /// <response code="404">Password reset process not found</response>
    [HttpHead("recover/{passwordResetId}/{secret}")]
    [ProducesSuccess]
    [ProducesProblem(HttpStatusCode.NotFound, "PasswordResetNotFound")]
    [MapToApiVersion("1")]
    public async Task<IActionResult> PasswordResetCheckValid([FromRoute] Guid passwordResetId, [FromRoute] string secret, [FromServices] IAccountService accountService, CancellationToken cancellationToken)
    {
        var passwordResetExists = await accountService.PasswordResetExists(passwordResetId, secret, cancellationToken);
        return passwordResetExists.Match(
            success => RespondSuccessSimple("Valid password reset process"),
            notFound => Problem(PasswordResetError.PasswordResetNotFound),
            invalid => Problem(PasswordResetError.PasswordResetNotFound)
        );
    }
}