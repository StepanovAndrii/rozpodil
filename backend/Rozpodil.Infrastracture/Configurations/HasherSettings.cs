using Rozpodil.Application.Common.Enums;

namespace Rozpodil.Infrastructure.Configurations
{
    public class HasherSettings
    {
        // TODO: розібратись більш детально
        public Dictionary<string, HasherType> ServiceHasherMap { get; set; } = new();
    }
}
