using AutoMapper;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Mappings
{
    public class UserModelMappingProfile: Profile
    {
        public UserModelMappingProfile()
        {
            CreateMap<UserModel, User>()
                .ForMember(destination => destination.Id,
                    options => options.MapFrom(
                        source => Guid.NewGuid()
                    ));
            CreateMap<UserCredentialsModel, UserCredentials>();
        }
    }
}
