﻿using Microsoft.Extensions.Primitives;
using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace OpenShock.Common.Utils;

public static class ConnectionDetailsFetcher
{
    public static IPAddress GetRemoteIP(this HttpContext context)
    {
        return context.Connection?.RemoteIpAddress ?? throw new NullReferenceException("Unable to get any IP address, underlying transport type is not TCP???"); // This should never happen, as the underlying transport type will always be TCP
    }

    public static string GetUserAgent(this HttpContext context)
    {
        return context.Request.Headers.UserAgent.ToString();
    }

    public static bool TryGetCFIPCountry(this HttpContext context, [MaybeNullWhen(false)] out string cfIpCountry)
    {
        if (!context.Request.Headers.TryGetValue("CF-IPCountry", out var value))
        {
            cfIpCountry = null;
            return false;
        }

        if (string.IsNullOrEmpty(value))
        {
            cfIpCountry = null;
            return false;
        }

        cfIpCountry = value;

        return true;
    }

    public static string? GetCFIPCountry(this HttpContext context)
    {
        if (!TryGetCFIPCountry(context, out var value)) return null;

        return value;
    }
}
