using Backend.Logic.Entities;

namespace Backend.Application.Abstracts
{
    public interface IAuthTokenProcessor
    {
        (string jwtToken, DateTime expiresAtUtc) GenerateJwtToken(UserEntity user);

        string GenerateRefreshToken();

        void WriteAuthTokenAsHttpOnlyCookie(string cookieName, string token,
            DateTime expiration);
    }
}
