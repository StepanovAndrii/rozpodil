using Rozpodil.Domain.Entities;

namespace Rozpodil.Domain.Repositories
{
    public interface IRoomRepository
    {
        Task CreateRoomAsync(Room room);
        Task<IList<Room>> GetRoomsByUserIdAsync(Guid userId);
    }
}
