using Microsoft.EntityFrameworkCore;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Models.Dtos;
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

        public Task DeleteUserRoom(RoomUser roomUser)
        {
            _context.Remove(roomUser);
            return Task.CompletedTask;
        }

        public async Task<IList<Guid>> GetRoomIdsByUserId(Guid userId)
        {
            return await _context.RoomUsers
                .Where(roomUser => roomUser.UserId == userId)
                .Select(roomUser => roomUser.RoomId)
                .ToListAsync();
        }

        public async Task<IList<Room>> GetRoomsByUserId(Guid userId, int? limit = null)
        {
            var query = _context.RoomUsers
                .Where(ru => ru.UserId == userId)
                .Select(ru => ru.Room);

            if (limit.HasValue)
                query = query.Take(limit.Value);

            return await query.ToListAsync();
        }

        public async Task<User?> GetUserByRoomAsync(Guid roomId, Guid userId)
        {
            return await _context.RoomUsers
            .Where(roomUser => roomUser.RoomId == roomId && roomUser.UserId == userId)
            .Select(roomUser => roomUser.User)
            .FirstOrDefaultAsync();
        }

        public async Task<RoomUser?> GetUserRoomAsync(Guid roomId, Guid userId)
        {
             return await _context.RoomUsers
                .AsNoTracking() // TODO: додати всюди де читаю дані
                .FirstOrDefaultAsync(roomUser => roomUser.UserId == userId
                    && roomUser.RoomId == roomId);
        }

        public async Task<IList<User>> GetUsersByRoomId(Guid roomId)
        {
            return await _context.RoomUsers
                .Where(roomUser => roomUser.RoomId == roomId)
                .Select(roomUser => roomUser.User)
                .ToListAsync();
        }

        public async Task<List<UserWithRoles>> GetUsersWithRolesInRoomAsync(Guid roomId)
        {
            return await _context.RoomUsers
                .Where(roomUsers => roomUsers.RoomId == roomId)
                .Include(roomUsers => roomUsers.User)
                .Select(roomUsers => new UserWithRoles
                {
                    Id = roomUsers.UserId,
                    Username = roomUsers.User.Username,
                    PhotoUrl = roomUsers.User.PhotoUrl,
                    Role = roomUsers.Role
                }).ToListAsync();
        }


        public async Task<bool> IsUserInRoomAsync(Guid roomId, Guid userId)
        {
            return await _context.RoomUsers
                .AnyAsync(ru => ru.RoomId == roomId && ru.UserId == userId);
        }
    }
}
