using Backend.Application.Abstracts.ExternalAbstracts.EmailVerification;
using FluentEmail.Core;

namespace Backend.Infrastructure.Services.EmailVerification
{
    public class EmailVerificationService(
            IEmailVerificationTemplateService linkVerificationTemplate,
            IFluentEmail fluentEmail
        ) : IEmailVerificationService
    {
        public Task SendVerificationLinkAsync(string id, string email, string verificationToken)
        {
            return fluentEmail
                .To(email)
                .Subject("ROZPODIL | Email Verification")
                .Body(linkVerificationTemplate.GetTemplate(id, verificationToken), true)
                .SendAsync();
        }
    }
}
