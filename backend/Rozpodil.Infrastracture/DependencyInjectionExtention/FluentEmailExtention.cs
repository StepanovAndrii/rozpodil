using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rozpodil.Application.Abstracts;
using Rozpodil.Infrastructure.Configurations;
using Rozpodil.Infrastructure.DependencyInjectionExtention;
using Rozpodil.Infrastructure.Services;
using System.Net;
using System.Net.Mail;

namespace Rozpodil.Infrastructure.DependencyInjectionExtention
{
    public static class FluentEmailExtention
    {
        public static IServiceCollection AddFluentEmail(this IServiceCollection services, IConfiguration configuration)
        {
            var emailVerificationSettings = configuration.GetSection("EmailOptions").Get<EmailSettings>();

            services
                .AddFluentEmail(emailVerificationSettings!.SenderEmail)
                .AddSmtpSender(() => new SmtpClient(emailVerificationSettings.SmtpServer)
                {
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(emailVerificationSettings.SenderEmail, emailVerificationSettings.SenderPassword),
                    EnableSsl = emailVerificationSettings.UseSsl,
                    Port = emailVerificationSettings.SmtpPort
                });

            services.AddScoped<IEmailVerificationService, FluentEmailVerificationService>();

            return services;
        }
    }
}