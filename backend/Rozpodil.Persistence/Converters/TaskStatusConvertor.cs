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
    public class TaskStatusConvertor : ValueConverter<TaskStatuses, string>
    {
        public TaskStatusConvertor() : base(
                v => GetEnumMemberValue(v),
                v => GetEnumByMemberValue(v)
            )
        { }

        public static string GetEnumMemberValue(TaskStatuses value)
        {
            var type = typeof(TaskStatuses);
            var member = type.GetMember(value.ToString()).FirstOrDefault();
            var attribute = member?.GetCustomAttributes(false)
                .OfType<EnumMemberAttribute>()
                .FirstOrDefault();

            return attribute?.Value ?? value.ToString();
        }

        private static TaskStatuses GetEnumByMemberValue(string value)
        {
            foreach (TaskStatuses status in Enum.GetValues(typeof(TaskStatuses)))
            {
                var type = typeof(TaskStatuses);
                var member = type.GetMember(status.ToString()).FirstOrDefault();
                var attribute = member?.GetCustomAttributes(false)
                    .OfType<EnumMemberAttribute>()
                    .FirstOrDefault();

                if (attribute?.Value == value)
                    return status;
            }

            throw new ArgumentException($"Invalid TaskStatus value: {value}");
        }
    }
}
