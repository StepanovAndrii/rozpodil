namespace Rozpodil.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public string? PhotoUrl { get; set; }
        public bool IsEmailConfirmed { get; set; }

        public required UserCredentials Credentials { get; set; }
        public ICollection<RoomUser> RoomUsers { get; set; } = new List<RoomUser>();
        public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    }
}
