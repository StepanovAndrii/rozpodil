using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Configurations
{
    public class TwoFactorCodeConfiguration : IEntityTypeConfiguration<TwoFactorCode>
    {
        public void Configure(EntityTypeBuilder<TwoFactorCode> builder)
        {
            builder.HasKey(twoFactorCode => twoFactorCode.UserId);
            builder.HasOne(twoFactorCode => twoFactorCode.User)
                .WithOne()
                .HasForeignKey<TwoFactorCode>(twoFactorCode => twoFactorCode.UserId);
        }
    }
}
