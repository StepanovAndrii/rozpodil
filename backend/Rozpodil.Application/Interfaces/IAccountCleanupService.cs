namespace Rozpodil.Application.Interfaces
{
    public interface IAccountCleanupService
    {
        Task CleanExpiredCodesAsync(CancellationToken cancellationToken);
        Task DeleteUnverifiedUsersWithExpiredCodesAsync(
            CancellationToken cancellationToken
        );
    }
}
