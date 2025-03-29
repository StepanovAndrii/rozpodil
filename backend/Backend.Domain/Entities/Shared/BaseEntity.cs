using Backend.Logic.Entities.Common.Interfaces;
using Backend.Logic.Entities.Shared;
using Backend.Logic.Entities.Shared.Behaviors;

namespace Backend.Logic.Entities.Common
{
    public class BaseEntity : IEntity, IDescribable, IUserTracking, IAuditable
    {
        public Guid Id { get; set; }

        private Describable _description = new();
        private UserTracking _tracking = new();
        private Auditable _audit = new();

        public string Name
        {
            get => _description.Name;
            set => _description.Name = value;
        }
        public string? Description
        {
            get => _description.Description;
            set => _description.Description = value;
        }
        public Guid UserCreated
        {
            get => _tracking.UserCreated;
            set => _tracking.UserCreated = value;
        }
        public Guid UserUpdated
        {
            get => _tracking.UserUpdated;
            set => _tracking.UserUpdated = value;
        }
        public DateTime DateCreated
        {
            get => _audit.DateCreated;
            set => _audit.DateCreated = value;
        }
        public DateTime DateUpdated
        {
            get => _audit.DateCreated;
            set => _audit.DateCreated = value;
        }
    }
}
