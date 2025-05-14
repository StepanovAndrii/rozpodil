using Rozpodil.Domain.Entities;

namespace Rozpodil.Domain.Repositories
{
    public interface IUserCredentialsRepository
    {
        Task<UserCredentials?> GetUserCredentialsByEmailAsync(string email);
        Task<bool> ExistsByEmailAsync(string email);
        Task<User?> GetUserByEmailAsync(string email);
        Task<bool> IsEmailTakenAsync(string email);
    }
}
