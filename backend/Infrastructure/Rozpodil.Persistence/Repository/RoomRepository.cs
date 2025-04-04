using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Repository
{
    public class RoomRepository
    {
        private readonly DatabaseContext _context;

        public RoomRepository(
            DatabaseContext context
            ) {
            _context = context;
        }

        public async Task CreateRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Room>> GetRoomsByUserIdAsync(Guid userId)
        {
            return await _context.Rooms
                .Where(room => room.Users.Any(user => user.Id == userId))
                .ToListAsync();
        }
    }
}
