namespace Rozpodil.API.Dtos.Requests.Task
{
    public class CreateTaskDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required DateTime Deadline { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required Guid RoomId { get; set; }
        public required Guid UserId { get; set; }
    }
}
