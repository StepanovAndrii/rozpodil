namespace Backend.Application.Abstracts
{
    public interface IAccountService
    {
        // TODO Task RegisterAsync(RegisterRequest registerRequest);
        // TODO Task LoginAsync(LoginRequest loginRequest);
        Task RefreshTokenAsync(string? refreshToken);
    }
}
