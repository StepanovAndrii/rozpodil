using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Interfaces.Repositories;
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
        public IRefreshTokenRepository RefreshTokenRepository { get; }

        private readonly DatabaseContext _context;

        public UnitOfWork(
                IUserCredentialsRepository userCredentialsRepository,
                IUserRepository userRepository,
                ITwoFactorCodeRepository twoFactorCodeRepository,
                IRoomRepository roomRepository,
                IRefreshTokenRepository refreshTokenRepository,
                DatabaseContext context
            )
        {
            UserCredentialsRepository = userCredentialsRepository;
            UserRepository = userRepository;
            TwoFactorCodeRepository = twoFactorCodeRepository;
            RoomRepository = roomRepository;
            RefreshTokenRepository = refreshTokenRepository;
            _context = context;
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
