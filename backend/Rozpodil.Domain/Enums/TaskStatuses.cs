using System.Runtime.Serialization;

namespace Rozpodil.Domain.Enums
{
    public enum TaskStatuses
    {
        [EnumMember(Value = "Очікує")]
        Pending,
        [EnumMember(Value = "В процесі")]
        InProgress,
        [EnumMember(Value = "Виконано")]
        Completed
    }
}
