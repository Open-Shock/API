﻿using System.Text.Json.Serialization;
using OpenShock.Common.JsonSerialization;
using Redis.OM.Modeling;

namespace OpenShock.Common.Redis;

[Document(StorageType = StorageType.Json, IndexName = "login-session-v2")]
public sealed class LoginSession
{
    [RedisIdField] [Indexed] public required string Id { get; set; }
    [Indexed] public required Guid UserId { get; set; }
    [Indexed] public required string Ip { get; set; }
    [Indexed] public required string UserAgent { get; set; }
    [Indexed] public Guid? PublicId { get; set; }
    [JsonConverter(typeof(UnixMillisecondsDateTimeOffsetConverter))]
    public DateTimeOffset? Created { get; set; }
    [JsonConverter(typeof(UnixMillisecondsDateTimeOffsetConverter))]
    public DateTimeOffset? Expires { get; set; }
    [JsonConverter(typeof(UnixMillisecondsDateTimeOffsetConverter))]
    public DateTimeOffset? LastUsed { get; set; }
}