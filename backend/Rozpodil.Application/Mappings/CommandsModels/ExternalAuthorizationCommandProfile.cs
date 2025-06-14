using AutoMapper;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Mappings.CommandsModels
{
    public class ExternalAuthenticationCommandProfile : Profile
    {
        public ExternalAuthenticationCommandProfile()
        {
            CreateMap<ExternalAuthenticationCommand, ExternalAuthenticationModel>();
        }
    }
}
