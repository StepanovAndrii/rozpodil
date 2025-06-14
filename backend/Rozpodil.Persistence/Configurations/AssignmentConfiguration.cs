using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Configurations
{
    internal class AssignmentConfiguration : IEntityTypeConfiguration<Assignment>
    {
        // TODO: задати максимум довжина Полів і так далі (обмеження)
        public void Configure(EntityTypeBuilder<Assignment> builder)
        {
            builder.HasKey(assignment => assignment.Id);

            builder.Property(assignment => assignment.UserId)
                .IsRequired(false);

            builder.HasOne(assignment => assignment.User)
                .WithMany()
                .HasForeignKey(assignment => assignment.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
