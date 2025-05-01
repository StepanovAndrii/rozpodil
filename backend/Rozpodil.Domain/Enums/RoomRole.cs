using System.Runtime.Serialization;

namespace Rozpodil.Domain.Enums
{
    public enum RoomRole
    {
        [EnumMember(Value = "Owner")]
        Owner,
        [EnumMember(Value = "Admin")]
        Admin,
        [EnumMember(Value = "Member")]
        Member
    }
}
