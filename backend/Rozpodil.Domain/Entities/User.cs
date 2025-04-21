namespace Rozpodil.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public bool IsEmailConfirmed { get; set; }

        public required UserCredentials Credentials { get; set; }
        public IList<Room> Rooms { get; set; } = new List<Room>();
    }
}
