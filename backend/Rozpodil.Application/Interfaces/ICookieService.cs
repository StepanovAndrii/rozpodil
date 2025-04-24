namespace Rozpodil.Application.Interfaces
{
    public interface ICookieService
    {
        void SetRefreshToken(string refreshToken, int expiresAtDays);
        string? GetRefreshToken();
        void RemoveRefreshToken();
    }
}
