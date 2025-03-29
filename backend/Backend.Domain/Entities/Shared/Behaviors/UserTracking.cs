using Backend.Logic.Entities.Common.Interfaces;

namespace Backend.Logic.Entities.Shared.Behaviors
{
    public class UserTracking : IUserTracking
    {
        public Guid UserCreated { get; set; }
        public Guid UserUpdated { get; set; }
    }
}
