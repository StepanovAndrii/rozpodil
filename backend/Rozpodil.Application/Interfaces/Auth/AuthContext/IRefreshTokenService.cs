namespace Rozpodil.Application.Interfaces.Auth.AuthContext
{
    public interface IRefreshTokenService
    {
        Task<string> GenerateAsync(
            Guid userId,
            int expirationDays,
            CancellationToken cancellationToken = default
        );
    }
}
