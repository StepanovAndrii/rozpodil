using Rozpodil.Domain.Entities;

namespace Rozpodil.Domain.Repositories
{
    public interface IRoomRepository
    {
        Task CreateRoom(Room room);
        Task<List<Room>> GetRoomsByUserIdAsync(Guid userId);
    }
}
