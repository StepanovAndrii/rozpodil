using Rozpodil.Domain.Enums;

namespace Rozpodil.Application.Models.Dtos
{
    // TODO: придумати краще місце для цього
    public class UserWithRoles
    {
        public required Guid Id { get; set; }
        public required string Username { get; set; }
        public string? PhotoUrl { get; set; }
        public RoomRole Role { get; set; }
    }
}
