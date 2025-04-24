using AutoMapper;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Mappings.ModelsEntities
{
    public class RefreshTokenModelMappingProfile: Profile
    {
        public RefreshTokenModelMappingProfile()
        {
            CreateMap<RefreshTokenModel, RefreshToken>()
                .ForMember(
                    destination => destination.User,
                    options => options.Ignore());
            CreateMap<RefreshToken, RefreshTokenModel>();
        }
    }
}
