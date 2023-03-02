﻿namespace ShockLink.API.Models.Response;

public class Device
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required DateTime CreatedOn { get; set; }
}