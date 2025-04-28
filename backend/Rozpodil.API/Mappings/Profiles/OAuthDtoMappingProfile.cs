using AutoMapper;
using Rozpodil.API.Dtos.Requests;
using Rozpodil.Application.Commands;

namespace Rozpodil.API.Mappings.Profiles
{
    public class OAuthDtoMappingProfile: Profile
    {
        public OAuthDtoMappingProfile()
        {
            CreateMap<ExternalAuthenticationRequest, ExternalAuthenticationCommand>();
        }
    }
}
