using AutoMapper;
using Rozpodil.API.Dtos.Requests.Auth;
using Rozpodil.Application.Commands;

namespace Rozpodil.API.Mappings.Profiles
{
    public class LoginUserDtoMappingProfile: Profile
    {
        public LoginUserDtoMappingProfile()
        {
            CreateMap<LoginUserRequest, LoginCommand>();
        }
    }
}
