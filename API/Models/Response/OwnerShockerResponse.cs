﻿using OpenShock.Common.Models;

namespace OpenShock.API.Models.Response;

public sealed class OwnerShockerResponse : GenericIni
{
    public IList<SharedDevice> Devices { get; set; } = new List<SharedDevice>();

    public sealed class SharedDevice
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        // ReSharper disable once CollectionNeverQueried.Global
        public IList<SharedShocker> Shockers { get; set; } = new List<SharedShocker>();

        public sealed class SharedShocker
        {
            public required Guid Id { get; set; }
            public required string Name { get; set; }
            public required bool IsPaused { get; set; }
            public required ShockerPermissions Permissions { get; set; }
            public required ShockerLimits Limits { get; set; }
        }
    }
}