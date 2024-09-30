﻿using OpenShock.Common.Redis;
using OpenShock.Common.Utils;

namespace OpenShock.ServicesCommon.Geo;

public interface IGeoLocation
{
    public Task<LcgNode?> GetClosestNode(CountryCodeMapper.Alpha2CountryCode countryCode, string environment = "Production");
}