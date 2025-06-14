using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rozpodil.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAsingedTo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assignments_Users_UserId1",
                table: "Assignments");

            migrationBuilder.RenameColumn(
                name: "UserId1",
                table: "Assignments",
                newName: "AssignedToId");

            migrationBuilder.RenameIndex(
                name: "IX_Assignments_UserId1",
                table: "Assignments",
                newName: "IX_Assignments_AssignedToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assignments_Users_AssignedToId",
                table: "Assignments",
                column: "AssignedToId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assignments_Users_AssignedToId",
                table: "Assignments");

            migrationBuilder.RenameColumn(
                name: "AssignedToId",
                table: "Assignments",
                newName: "UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Assignments_AssignedToId",
                table: "Assignments",
                newName: "IX_Assignments_UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Assignments_Users_UserId1",
                table: "Assignments",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
