using AutoMapper;
using Rozpodil.API.Dtos.Requests;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Models;

namespace Rozpodil.API.Mappings.Profiles
{
    public class UserDtoMappingProfile: Profile
    {
        public UserDtoMappingProfile()
        {
            CreateMap<RegisterUserRequest, RegisterUserCommand>();
            CreateMap<EmailConfirmationRequest, EmailVerificationModel>();
        }
    }
}
  