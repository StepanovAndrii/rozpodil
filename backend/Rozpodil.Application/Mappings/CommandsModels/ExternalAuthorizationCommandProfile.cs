using AutoMapper;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Mappings.CommandsModels
{
    public class ExternalAuthenticationCommandProfile : Profile
    {
        public ExternalAuthenticationCommandProfile()
        {
            CreateMap<ExternalAuthenticationCommandProfile, ExternalAuthenticationModel>();
        }
    }
}
