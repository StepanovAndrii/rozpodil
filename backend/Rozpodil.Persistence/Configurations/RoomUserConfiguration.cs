using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Configurations
{
    public class RoomUserConfiguration : IEntityTypeConfiguration<RoomUser>
    {
        public void Configure(EntityTypeBuilder<RoomUser> builder)
        {
            builder.HasKey(roomUser => new
            {
                roomUser.UserId,
                roomUser.RoomId
            });
            builder
                .Property(roomUser => roomUser.Role)
                .HasConversion<string>();
            builder
                .HasOne(userRoom => userRoom.User)
                .WithMany(user => user.RoomUsers)
                .HasForeignKey(roomUser => roomUser.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .HasOne(roomUser => roomUser.Room)
                .WithMany(room => room.RoomUsers)
                .HasForeignKey(roomUser => roomUser.RoomId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
