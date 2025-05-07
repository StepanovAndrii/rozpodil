using AutoMapper;
using Rozpodil.API.Dtos.Responses;
using Rozpodil.Application.Models.Dtos;

namespace Rozpodil.API.Mappings.Profiles
{
    // TODO: воно тут не має бути
    public class UsersRolesDtoMappingProfile : Profile
    {
        public UsersRolesDtoMappingProfile()
        {
            CreateMap<UserWithRoles, UsersRolesResponse>();
        }
    }
}
