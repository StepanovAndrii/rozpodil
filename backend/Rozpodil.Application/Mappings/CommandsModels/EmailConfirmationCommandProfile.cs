using AutoMapper;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Mappings.CommandsModels
{
    public class EmailConfirmationCommandProfile: Profile
    {
        public EmailConfirmationCommandProfile()
        {
            CreateMap<EmailConfirmationCommand, EmailVerificationModel>();
        }
    }
}
