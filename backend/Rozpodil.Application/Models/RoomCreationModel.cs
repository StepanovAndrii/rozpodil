namespace Rozpodil.Application.Models
{
    public class RoomCreationModel
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Code { get; set; }
    }
}
