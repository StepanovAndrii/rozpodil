namespace Rozpodil.Application.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(Guid userId);
    }
}
