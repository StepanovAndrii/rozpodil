namespace Backend.Application.Abstracts.ExternalAbstracts.EmailVerification
{
    public interface IEmailVerificationService
    {
        Task SendVerificationLinkAsync(string id, string email, string verificationToken);
    }
}
