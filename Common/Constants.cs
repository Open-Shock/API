﻿namespace OpenShock.Common;

public static class Constants
{
    public const byte MinControlIntensity = 0;
    public const byte MaxControlIntensity = 100;

    public const ushort MinControlDuration = 300;
    public const ushort MaxControlDuration = 30000; // TODO: No reason to hard limit this to 30 seconds, can we extend it to ushort.MaxValue (35565)?

    public static readonly TimeSpan PasswordResetRequestLifetime = TimeSpan.FromHours(1);

    public const double DistanceToAndromedaGalaxyInKm = 2.401E19;
}
