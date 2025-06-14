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

        public async Task<Room> CreateRoomAsync(Room room)
        {
            await _context.Rooms.AddAsync(room);
            return room;
        }

        public Task DeleteRoom(Room room)
        {
           _context.Rooms.Remove(room);
           return Task.CompletedTask;
        }

        public async Task<Room?> GetRoomByCode(string code)
        {
            return await _context.Rooms
                .FirstOrDefaultAsync(room => room.Code == code);
        }

        public async Task<Room?> GetRoomById(Guid id)
        {
            return await _context.Rooms
                .FindAsync(id);
        }

        public async Task<IList<Room>> GetRoomsByUserIdAsync(Guid userId)
        {
            // TODO: розібрати
            return await _context.Rooms
                .Join(_context.RoomUsers, room => room.Id, roomUser => roomUser.RoomId, (room, roomUser) => new {room, roomUser})
                .Where(roomWithUser => roomWithUser.roomUser.UserId == userId)
                .Select(roomWithUser => roomWithUser.room)
                .ToListAsync();
        }
    }
}
