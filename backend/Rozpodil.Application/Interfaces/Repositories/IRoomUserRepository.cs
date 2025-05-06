using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Interfaces.Repositories
{
    public interface IRoomUserRepository
    {
        Task<RoomUser> CreateRoomUserAsync(RoomUser roomUser);
        Task<IList<Room>> GetRoomsByUserId(Guid userId);
        Task<IList<Guid>> GetRoomIdsByUserId(Guid userId);
    }
}
