namespace Rozpodil.Domain.Repositories
{
    public interface IUserCredentialsRepository
    {
        Task<bool> ExistsByEmailAsync(string email);
    }
}
