﻿using System.ComponentModel.DataAnnotations;
using OpenShock.Common.DataAnnotations;

namespace OpenShock.API.Models.Requests;

public sealed class SignUp
{
    [Username(true)]
    public required string Username { get; set; }
    [StringLength(256, MinimumLength = 12)]
    public required string Password { get; set; }
    [EmailAddress]
    public required string Email { get; set; }
}