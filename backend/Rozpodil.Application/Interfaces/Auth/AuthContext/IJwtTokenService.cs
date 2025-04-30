namespace Rozpodil.Application.Interfaces.Auth.AuthContext
{
    public interface IJwtTokenService
    {
        string GenerateToken(Guid userId);
    }
}
