using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Configurations
{
    public class UserCredentialsConfiguration : IEntityTypeConfiguration<UserCredentials>
    {
        public void Configure(EntityTypeBuilder<UserCredentials> builder)
        {
            builder.HasKey(userCredentials => userCredentials.UserId);
            builder.HasOne(userCredentials => userCredentials.User)
                .WithOne(user => user.Credentials)
                .HasForeignKey<UserCredentials>(userCredentials => userCredentials.UserId);
        }
    }
}
