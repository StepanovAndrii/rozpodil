using Backend.Logic.Entities.Common.Interfaces;

namespace Backend.Logic.Entities.Shared.Behaviors
{
    public class Describable : IDescribable
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
    }
}
