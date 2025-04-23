using FluentEmail.Core;
using Rozpodil.Application.Abstracts;

namespace Rozpodil.Infrastructure.Services
{
    public class FluentEmailVerificationService : IEmailVerificationService
    {
        private readonly IFluentEmail _fluentEmail;
        private readonly string _subject =
            "Rozpodil | Code verification";

        // TODO: Зробити гарне оформлення листу в пошті
        private readonly string _body =
            "";

        public FluentEmailVerificationService(IFluentEmail fluentEmail)
        {
            _fluentEmail = fluentEmail;
        }

        public async Task SendVerificationCodeAsync(string email, string code)
        {
            await _fluentEmail
                .To(email)
                .Subject(_subject)
                .Body(code, true)
                .SendAsync();
        }
    }
}
