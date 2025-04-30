namespace Rozpodil.Application.Interfaces.Auth
{
    public interface IEmailVerificationService
    {
        Task SendVerificationCodeAsync(string email, string code);
    }
}
