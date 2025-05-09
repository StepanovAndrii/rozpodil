using Rozpodil.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rozpodil.Domain.Entities
{
    public class Assignment
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public TaskStatuses Status { get; set; }
        public DateTime dueTime { get; set; }
        public DateTime createdAt { get; set; }
        public User? AssignedTo { get; set; } 

        public Guid RoomId { get; set; }
        public required Room Room { get; set; }


        public Guid? UserId { get; set; }
        public required User User { get; set; }
    }
}
