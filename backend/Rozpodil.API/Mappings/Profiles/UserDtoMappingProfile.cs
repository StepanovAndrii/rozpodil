using AutoMapper;
using Rozpodil.API.Dtos.Requests.Auth;
using Rozpodil.API.Dtos.Responses;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Models;

namespace Rozpodil.API.Mappings.Profiles
{
    public class UserDtoMappingProfile: Profile
    {
        public UserDtoMappingProfile()
        {
            CreateMap<RegisterUserRequest, RegisterUserCommand>();
            CreateMap<ResendEmailConfirmationCodeRequest, ResendEmailConfirmationCodeCommand>();
            CreateMap<EmailConfirmationRequest, EmailConfirmationCommand>();
            CreateMap<AccessTokenModel, AccessTokenResponse>();
        }
    }
}
  