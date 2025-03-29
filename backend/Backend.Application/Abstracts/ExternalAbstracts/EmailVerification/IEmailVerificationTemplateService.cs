namespace Backend.Application.Abstracts.ExternalAbstracts.EmailVerification
{
    public interface IEmailVerificationTemplateService
    {
        string GetTemplate(string recipientEmail, string verificationToken);
    }
}
