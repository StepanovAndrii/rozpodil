using System.ComponentModel.DataAnnotations;

namespace Rozpodil.Domain.Entities
{
    public class Room
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Code { get; set; }
        public ICollection<RoomUser> RoomUsers { get; set; } = new List<RoomUser>();
    }
}
