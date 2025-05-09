using System.Runtime.Serialization;

namespace Rozpodil.Domain.Enums
{
    public enum TaskStatuses
    {
        [EnumMember(Value = "Створене")]
        Pending,
        [EnumMember(Value = "В процесі")]
        InProgress,
        [EnumMember(Value = "Виконане")]
        Completed
    }
}
