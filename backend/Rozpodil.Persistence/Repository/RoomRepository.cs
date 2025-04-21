using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;
using Rozpodil.Domain.Repositories;

namespace Rozpodil.Persistence.Repository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly DatabaseContext _context;

        public RoomRepository(
            DatabaseContext context
            ) {
            _context = context;
        }

        public async Task CreateRoomAsync(Room room)
        {
            await _context.Rooms.AddAsync(room);
        }

        public async Task<IList<Room>> GetRoomsByUserIdAsync(Guid userId)
        {
            return await _context.Rooms
                .Where(room => room.Users.Any(user => user.Id == userId))
                .ToListAsync();
        }
    }
}
