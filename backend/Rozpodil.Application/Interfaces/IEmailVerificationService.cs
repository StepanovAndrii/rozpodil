namespace Rozpodil.Application.Abstracts
{
    public interface IEmailVerificationService
    {
        Task SendVerificationCodeAsync(string email, string code);
    }
}
