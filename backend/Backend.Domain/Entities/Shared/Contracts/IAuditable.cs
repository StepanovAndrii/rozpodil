namespace Backend.Logic.Entities.Common.Interfaces
{
    public interface IAuditable
    {
        DateTime DateCreated { get; set; }
        DateTime DateUpdated { get; set; }
    }
}
