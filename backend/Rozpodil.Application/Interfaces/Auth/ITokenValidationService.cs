﻿using System.Security.Claims;

namespace Rozpodil.Application.Interfaces.Auth
{
    public interface ITokenValidationService
    {
        Task<ClaimsPrincipal> ValidateIdTokenAsync(
            string idToken,
            string jwksUrl,
            string validIssuer,
            string validAudience);
    }
}
