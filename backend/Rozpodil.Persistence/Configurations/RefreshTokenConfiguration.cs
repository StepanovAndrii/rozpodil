using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Configurations
{
    internal class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            builder.HasKey(twoFactorCode => twoFactorCode.UserId);
            builder.HasOne(twoFactorCode => twoFactorCode.User)
                .WithOne()
                .HasForeignKey<TwoFactorCode>(twoFactorCode => twoFactorCode.UserId);
        }
    }
}
