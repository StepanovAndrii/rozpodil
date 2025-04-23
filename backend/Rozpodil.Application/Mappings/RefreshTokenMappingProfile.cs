using AutoMapper;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Mappings
{
    public class RefreshTokenMappingProfile: Profile
    {
        public RefreshTokenMappingProfile()
        {
            CreateMap<RefreshTokenModel, RefreshToken>()
                .ForMember(
                    destination => destination.User,
                    options => options.Ignore());
            CreateMap<RefreshToken, RefreshTokenModel>();
        }
    }
}
