using AutoMapper;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Mappings.CommandsModels
{
    public class LoginUserCommandProfile: Profile
    {
        public LoginUserCommandProfile()
        {
            CreateMap<LoginCommand, LoginModel>();
        }
    }
}
