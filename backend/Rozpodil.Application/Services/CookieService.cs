using Microsoft.AspNetCore.Http;
using Rozpodil.Application.Interfaces;

namespace Rozpodil.Application.Services
{
    public class CookieService : ICookieService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CookieService(
                IHttpContextAccessor httpContextAccessor
            )
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? GetRefreshToken()
        {
            return _httpContextAccessor.HttpContext?.Request.Cookies["RefreshToken"];
        }

        public void RemoveRefreshToken()
        {
            _httpContextAccessor.HttpContext?.Response.Cookies.Delete("RefreshToken");
        }

        public void SetRefreshToken(string refreshToken, int expiresAtDays)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax, // TODO: змінити
                Expires = DateTime.UtcNow.AddDays(expiresAtDays), //expiresAtDays
                IsEssential = true
            };

            _httpContextAccessor.HttpContext?.Response.Cookies.Append("RefreshToken", refreshToken, cookieOptions);
        }
    }
}
