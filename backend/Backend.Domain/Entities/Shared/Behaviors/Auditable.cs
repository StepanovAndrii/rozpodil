using Backend.Logic.Entities.Common.Interfaces;

namespace Backend.Logic.Entities.Shared.Behaviors
{
    public class Auditable : IAuditable
    {
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
