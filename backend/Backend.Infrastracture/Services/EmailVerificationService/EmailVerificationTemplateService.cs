using Backend.Application.Abstracts.ExternalAbstracts.EmailVerification;

namespace Backend.Infrastructure.Services.EmailVerificationService
{
    public class EmailVerificationTemplateService : IEmailVerificationTemplateService
    {
       // private readonly ObjectCache _cache;

        public string GetTemplate(string recipientEmail, string verificationToken)
        {
            return "";
        }

        private string GetHeaderStyles() => "text-align: center; background-color: #000000; color: #ffffff; font-weight: 400;";
        private string GetLinkStyles() => "display: inline-block; padding: 10px 20px; background-color: #000000; color: #ffffff; text-decoration: none;";
    }
}
