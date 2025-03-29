namespace Backend.Logic.Entities.Common.Interfaces
{
    public interface IUserTracking
    {
        Guid UserCreated { get; set; }
        Guid UserUpdated { get; set; }
    }
}
