﻿using System.ComponentModel.DataAnnotations;

namespace OpenShock.Common.Utils;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
public sealed class Alpha2CountryCodeAttribute : ValidationAttribute
{
    /// <inheritdoc/>
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null) return new ValidationResult("Value is null");
        if (value is not string asString) return new ValidationResult("Input type must be string");
        if (asString.Length != 2) return new ValidationResult("Input string must be exactly 2 characters long");
        if (!char.IsAsciiLetterUpper(asString[0]) || !char.IsAsciiLetterUpper(asString[1]))
            return new ValidationResult("Characters must be uppercase");
        if (!CountryCodeMapper.Alpha2CountryCode.TryParseAndValidate(asString, out var countryCode))
            return new ValidationResult(
                $"Failed to create {nameof(CountryCodeMapper.Alpha2CountryCode)}");
        if (!CountryCodeMapper.CountryCodeToCountryInfo.ContainsKey(countryCode))
            return new ValidationResult("Country does not exist in mapping");

        return ValidationResult.Success;
    }
}