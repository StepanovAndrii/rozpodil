namespace Rozpodil.Application.Interfaces
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
