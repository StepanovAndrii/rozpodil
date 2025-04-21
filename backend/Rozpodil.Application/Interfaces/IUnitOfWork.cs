using Rozpodil.Domain.Repositories;
using Rozpodil.Persistence.Repository;

namespace Rozpodil.Application.Interfaces
{
    public interface IUnitOfWork
    {
        IUserCredentialsRepository UserCredentialsRepository { get; }
        IUserRepository UserRepository { get; }
        ITwoFactorCodeRepository TwoFactorCodeRepository { get; }
        IRoomRepository RoomRepository { get; }
        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
