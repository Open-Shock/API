﻿using System.Net;

namespace OpenShock.Common.Problems.CustomProblems;

public sealed class ShockerControlProblem(
    string type,
    string title,
    Guid shockerId,
    HttpStatusCode status = HttpStatusCode.BadRequest,
    string? detail = null)
    : OpenShockProblem(type, title, status, detail)
{
    public Guid ShockerId { get; set; } = shockerId;
}