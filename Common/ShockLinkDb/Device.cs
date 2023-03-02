﻿using System;
using System.Collections.Generic;

namespace ShockLink.Common.ShockLinkDb;

public partial class Device
{
    public Guid Id { get; set; }

    public Guid Owner { get; set; }

    public string Name { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string Token { get; set; } = null!;

    public virtual User OwnerNavigation { get; set; } = null!;

    public virtual ICollection<Shocker> Shockers { get; } = new List<Shocker>();
}
