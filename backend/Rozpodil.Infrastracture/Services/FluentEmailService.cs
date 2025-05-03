using FluentEmail.Core;
using Rozpodil.Application.Interfaces.Auth;

namespace Rozpodil.Infrastructure.Services
{
    public class FluentEmailService : IEmailService
    {
        private readonly IFluentEmail _fluentEmail;

        // TODO: Зробити гарне оформлення листу в пошті
        private readonly string _body =
            "";

        public FluentEmailService(IFluentEmail fluentEmail)
        {
            _fluentEmail = fluentEmail;
        }

        public async Task SendVerificationCodeAsync(
                string subject,
                string email,
                string code
            )
        {
            await _fluentEmail
                .To(email)
                .Subject($"Rozpodil | {subject}")
                .Body(code, true)
                .SendAsync();
        }
    }
}
