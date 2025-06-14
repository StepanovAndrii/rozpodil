using AutoMapper;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Mappings.CommandsModels
{
    public class RegisterUserCommandProfile: Profile
    {
        public RegisterUserCommandProfile() 
        {
            CreateMap<RegisterUserCommand, UserModel>()
                .ForMember(destination => destination.Id,
                    options => options.Ignore())
                .ForMember(destination => destination.IsEmailConfirmed,
                    options => options.Ignore())
                .ForMember(destination => destination.PhotoUrl,
                    options => options.Ignore());
            CreateMap<RegisterUserCommand, UserCredentialsModel>()
                .ForMember(destination => destination.UserId,
                    options => options.Ignore())
                .ForMember(destination => destination.HashedPassword,
                    options => options.Ignore());
        }
    }
}
