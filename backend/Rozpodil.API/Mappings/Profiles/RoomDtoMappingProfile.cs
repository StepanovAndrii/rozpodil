using AutoMapper;
using Rozpodil.API.Dtos.Requests.Room;
using Rozpodil.Application.Commands;

namespace Rozpodil.API.Mappings.Profiles
{
    public class RoomDtoMappingProfile : Profile
    {
        public RoomDtoMappingProfile()
        {
            CreateMap<CreateRoomRequest, CreateRoomCommand>();
        }
    }
}
