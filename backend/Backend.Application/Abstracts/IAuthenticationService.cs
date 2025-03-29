namespace Backend.Application.Abstracts
{
    public interface IAuthenticationService
    {
        public Task<string?> RegisterWithEmailAsync(string email, string password);
    }
}
