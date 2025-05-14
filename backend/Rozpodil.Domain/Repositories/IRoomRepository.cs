using Rozpodil.Domain.Entities;

namespace Rozpodil.Domain.Repositories
{
    public interface IRoomRepository
    {
        Task<Room> CreateRoomAsync(Room room);
        Task<IList<Room>> GetRoomsByUserIdAsync(Guid userId);
        Task<Room?> GetRoomById(Guid id);
        Task<Room?> GetRoomByCode(string code);
        Task DeleteRoom(Room room);
    }
}
