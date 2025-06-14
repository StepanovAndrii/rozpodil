using AutoMapper;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Mappings.CommandsModels
{
    // TODO: глянути в який випадках створювати profile
    public class RoomCommandProfile: Profile
    {
        public RoomCommandProfile()
        {
            CreateMap<CreateRoomCommand, RoomCreationModel>()
                .ForMember(destination => destination.Id,
                    options => options.Ignore())
                .ForMember(destination => destination.Code,
                    options => options.Ignore());
        }
    }
}
