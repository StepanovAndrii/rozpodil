using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Configurations
{
    public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            builder.HasKey(refreshToken => refreshToken.UserId);
            builder.HasOne(refreshToken => refreshToken.User)
                .WithOne()
                .HasForeignKey<RefreshToken>(refreshToken => refreshToken.UserId);
        }
    }
}
