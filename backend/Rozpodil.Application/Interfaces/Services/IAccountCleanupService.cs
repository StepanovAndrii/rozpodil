namespace Rozpodil.Application.Interfaces.Services
{
    public interface IAccountCleanupService
    {
        Task CleanExpiredCodesAsync(CancellationToken cancellationToken);
        Task DeleteUnverifiedUsersWithExpiredCodesAsync(
            CancellationToken cancellationToken
        );
    }
}
