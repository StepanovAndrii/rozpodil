namespace Backend.Logic.Entities.Common.Interfaces
{
    public interface IDescribable
    {
        string Name { get; set; }
        string? Description { get; set; }
    }
}
