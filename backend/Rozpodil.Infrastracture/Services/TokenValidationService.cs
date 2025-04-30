using Microsoft.IdentityModel.Tokens;
using Rozpodil.Application.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Rozpodil.Infrastructure.Services
{
    public class TokenValidationService: ITokenValidationService
    {
        private readonly HttpClient _httpClient;
        public TokenValidationService(
                HttpClient httpClient
            )
        {
            _httpClient = httpClient;
        }
        public async Task<ClaimsPrincipal> ValidateIdTokenAsync(
            string idToken,
            string jwksUrl,
            string validIssuer,
            string validAudience)
        {
            if (string.IsNullOrWhiteSpace(idToken))
                throw new ArgumentException("ID токен не може бути порожнім.", nameof(idToken));

            if (string.IsNullOrWhiteSpace(jwksUrl))
                throw new ArgumentException("JWKS URL не може бути порожнім.", nameof(jwksUrl));

            var handler = new JwtSecurityTokenHandler();

            var jwksResponse = await _httpClient.GetStringAsync(jwksUrl);
            var jwks = new JsonWebKeySet(jwksResponse);

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = validIssuer,

                ValidateAudience = true,
                ValidAudience = validAudience,

                ValidateLifetime = true,

                ValidateIssuerSigningKey = true,
                IssuerSigningKeys = jwks.Keys
            };

            try
            {
                var principal = handler.ValidateToken(idToken, validationParameters, out _);
                return principal;
            }
            catch ( Exception ex )
            {
                throw new SecurityTokenException("Невдала валідація токену.", ex);
            }
        }
    }
}
