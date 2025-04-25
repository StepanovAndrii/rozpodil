using Rozpodil.Domain.Entities;

namespace Rozpodil.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> CreateUserAsync(User user);
        Task<User?> GetUserByIdAsync(Guid id);
        Task MarkEmailAsVerifiedAsync(Guid id);
    }
}
