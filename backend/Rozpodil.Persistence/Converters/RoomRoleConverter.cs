using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Rozpodil.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Rozpodil.Persistence.Converters
{
    public class RoomRoleConverter : ValueConverter<RoomRole, string>
    {
        public RoomRoleConverter() : base(
                v => GetEnumMemberValue(v),
                v => GetEnumByMemberValue(v)
            )
        { }

        // TODO: Розібрати
        public static string GetEnumMemberValue(RoomRole value)
        {
            var type = typeof(RoomRole);
            var member = type.GetMember(value.ToString()).FirstOrDefault();
            var attribute = member?.GetCustomAttributes(false)
                .OfType<EnumMemberAttribute>()
                .FirstOrDefault();

            return attribute?.Value ?? value.ToString();
        }

        private static RoomRole GetEnumByMemberValue(string value)
        {
            foreach (RoomRole role in Enum.GetValues(typeof(RoomRole)))
            {
                var type = typeof(RoomRole);
                var member = type.GetMember(role.ToString()).FirstOrDefault();
                var attribute = member?.GetCustomAttributes(false)
                    .OfType<EnumMemberAttribute>()
                    .FirstOrDefault();

                if (attribute?.Value == value)
                    return role;
            }
            
            throw new ArgumentException($"Invalid RoomRole value: {value}");
        }
    }
}
