namespace Rozpodil.Application.Interfaces.Auth
{
    public interface IEmailService
    {
        Task SendVerificationCodeAsync(
            string subject,
            string email,
            string code
        );
    }
}
