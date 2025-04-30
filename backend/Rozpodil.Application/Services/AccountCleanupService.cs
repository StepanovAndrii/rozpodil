using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Interfaces.Services;

namespace Rozpodil.Application.Services
{
    public class AccountCleanupService : IAccountCleanupService
    {
        private IUnitOfWork _unitOfWork;

        public AccountCleanupService (IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task CleanExpiredCodesAsync(CancellationToken cancellationToken)
        {
            await _unitOfWork.TwoFactorCodeRepository.DeleteExpiredCodeAsync(cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteUnverifiedUsersWithExpiredCodesAsync(CancellationToken cancellationToken)
        {
            var unverifiedUsers = await _unitOfWork.UserRepository.GetUnverifiedUsersWithExpiredCodesAsync(cancellationToken);

            if (unverifiedUsers.Any())
            {
                foreach (var user in unverifiedUsers)
                {
                    await _unitOfWork.UserRepository.DeleteUserByIdAsync(user.Id);
                }

                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
