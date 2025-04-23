using AutoMapper;
using Rozpodil.API.Dtos.Requests;
using Rozpodil.Application.Models;

namespace Rozpodil.API.Mappings.Profiles
{
    public class UserDtoMappingProfile: Profile
    {
        public UserDtoMappingProfile()
        {
            CreateMap<RegisterUserRequest, UserModel>()
                .ForMember(destination => destination.Id,
                    options => options.MapFrom((_, _, _, context) =>
                        (Guid)context.Items["UserId"]))
                .ForMember(destination => destination.IsEmailConfirmed,
                    options => options.MapFrom(
                        _ => false
                    ));
            CreateMap<RegisterUserRequest, UserCredentialsModel>()
                .ForMember(destination => destination.UserId,
                    options => options.MapFrom((_, _, _, context) =>
                        (Guid)context.Items["UserId"]))
                .ForMember(destination => destination.HashedPassword,
                    option => option.MapFrom(
                        source => BCrypt.Net.BCrypt.HashPassword(source.Password)
                    ));
            CreateMap<EmailConfirmationRequest, EmailVerificationModel>();
        }
    }
}
  