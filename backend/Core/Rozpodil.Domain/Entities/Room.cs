namespace Rozpodil.Domain.Entities
{
    public class Room
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public int Code { get; set; }
        public IList<User> Users { get; set; } = new List<User>();
    }
}
