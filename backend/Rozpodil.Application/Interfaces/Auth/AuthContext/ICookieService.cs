namespace Rozpodil.Application.Interfaces.Auth.AuthContext
{
    public interface ICookieService
    {
        void SetRefreshToken(string refreshToken, int expiresAtDays);
        string? GetRefreshToken();
        void RemoveRefreshToken();
    }
}
