using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rozpodil.Persistence.Configurations
{
    public class RoomConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder)
        {
            builder.HasKey(room => room.Id);
            builder.HasMany(room =>
                room.Assignments)
                .WithOne(assignment => assignment.Room)
                .HasForeignKey(assignment => assignment.RoomId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
