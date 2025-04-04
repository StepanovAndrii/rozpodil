using Rozpodil.Domain.Entities;

namespace Rozpodil.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserById(Guid id);
    }
}
