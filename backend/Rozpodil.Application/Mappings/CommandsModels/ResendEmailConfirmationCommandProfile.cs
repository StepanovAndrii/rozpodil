using AutoMapper;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Mappings.CommandsModels
{
    public class ResendEmailConfirmationCommandProfile: Profile
    {
        public ResendEmailConfirmationCommandProfile()
        {
            CreateMap<ResendEmailConfirmationCodeCommand, ResendEmailVerificationCodeModel>();
        }
    }
}
