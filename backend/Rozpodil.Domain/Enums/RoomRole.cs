using System.Runtime.Serialization;

namespace Rozpodil.Domain.Enums
{
    public enum RoomRole
    {
        [Importance(1)]
        [EnumMember(Value = "Хост")]
        Owner,
        [Importance(2)]
        [EnumMember(Value = "Адміністратор")]
        Admin,
        [Importance(3)]
        [EnumMember(Value = "Учасник")]
        Member
    }

    [AttributeUsage(AttributeTargets.Field)]
    public class ImportanceAttribute : Attribute
    {
        public int Value { get; }
        public ImportanceAttribute (int value)
        {
            Value = value;
        }
    }

    // TODO: розібрати та закінчити
    public static class EnumExtentions
    {
        public static int GetImportance(this Enum value)
        {
            var type = value.GetType();
            var field = type.GetField(value.ToString());
            var attr = field?.GetCustomAttributes(typeof(ImportanceAttribute), false)
                .FirstOrDefault() as ImportanceAttribute;

            return attr?.Value ?? int.MaxValue;
                
        }
    }
}
