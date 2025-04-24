using AutoMapper;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Mappings.ModelsEntities
{
    public class UserModelMappingProfile: Profile
    {
        public UserModelMappingProfile()
        {
            CreateMap<UserModel, User>()
                .ForMember(
                    destination => destination.Credentials,
                    options => options.Ignore()
                )
                .ForMember(
                    destination => destination.Rooms,
                    options => options.Ignore()
                );
            CreateMap<UserCredentialsModel, UserCredentials>()
                .ForMember(
                    destination => destination.User,
                    options => options.Ignore()
                );
        }
    }
}
