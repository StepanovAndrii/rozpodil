using AutoMapper;
using Rozpodil.API.Dtos.Requests;
using Rozpodil.Application.Models;

namespace Rozpodil.API.Mappings.Profiles
{
    public class UserDtoMappingProfile: Profile
    {
        public UserDtoMappingProfile()
        {
            CreateMap<RegisterUserRequest, UserModel>();
            CreateMap<RegisterUserRequest, UserCredentialsModel>()
                .ForMember(destination => destination.HashedPassword,
                    option => option.MapFrom(
                        source => BCrypt.Net.BCrypt.HashPassword(source.Password)
                    ));
            CreateMap<EmailConfirmationRequest, EmailVerificationModel>();
        }
    }
}
  