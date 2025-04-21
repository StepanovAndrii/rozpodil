using Rozpodil.Application.Interfaces;
using Rozpodil.Domain.Repositories;
using Rozpodil.Persistence.Repository;

namespace Rozpodil.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        public IUserCredentialsRepository UserCredentialsRepository { get; }
        public IUserRepository UserRepository { get; }
        public ITwoFactorCodeRepository TwoFactorCodeRepository { get; }
        public IRoomRepository RoomRepository { get; }

        private readonly DatabaseContext _context;

        public UnitOfWork(
                IUserCredentialsRepository userCredentialsRepository,
                IUserRepository userRepository,
                ITwoFactorCodeRepository twoFactorCodeRepository,
                IRoomRepository roomRepository,
                DatabaseContext context
            )
        {
            UserCredentialsRepository = userCredentialsRepository;
            UserRepository = userRepository;
            TwoFactorCodeRepository = twoFactorCodeRepository;
            RoomRepository = roomRepository;
            _context = context;
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
