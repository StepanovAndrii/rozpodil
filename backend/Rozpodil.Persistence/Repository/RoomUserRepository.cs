using Microsoft.EntityFrameworkCore;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Repository
{
    public class RoomUserRepository : IRoomUserRepository
    {
        private readonly DatabaseContext _context;
        public RoomUserRepository(
                DatabaseContext context
            )
        {
            _context = context;
        }

        public async Task<RoomUser> CreateRoomUserAsync(RoomUser roomUser)
        {
            var existingRoomUser = await _context.RoomUsers
                .FirstOrDefaultAsync(
                    existingRoomUser => existingRoomUser.UserId == roomUser.UserId &&
                                        existingRoomUser.RoomId == roomUser.RoomId
                );

            if ( existingRoomUser == null )
            {
                _context.RoomUsers.Add(roomUser);
                return roomUser;
            }

            return existingRoomUser;
        }
    }
}
