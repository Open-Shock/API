﻿using Microsoft.AspNetCore.Mvc.Filters;
using OpenShock.Common.Models;
using OpenShock.Common.OpenShockDb;
using OpenShock.ServicesCommon.Authentication.Services;
using OpenShock.ServicesCommon.Errors;

namespace OpenShock.ServicesCommon.Authentication.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class UserSessionOnlyAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var tokenService = context.HttpContext.RequestServices.GetService<ITokenReferenceService<ApiToken>>();
        if (tokenService == null)
        {
            var error = AuthorizationError.UnknownError;
            context.Result = error.ToObjectResult(context.HttpContext);
            return;
        }

        if (tokenService.Token != null) context.Result = AuthorizationError.UserSessionOnly.ToObjectResult(context.HttpContext);
    }
}