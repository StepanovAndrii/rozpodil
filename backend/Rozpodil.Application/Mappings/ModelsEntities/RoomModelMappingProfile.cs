using AutoMapper;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Mappings.ModelsEntities
{
    public class RoomModelMappingProfile: Profile
    {
        public RoomModelMappingProfile()
        {
            CreateMap<RoomCreationModel, Room>()
                .ForMember(room => room.RoomUsers,
                    options => options.Ignore());
        }
    }
}
