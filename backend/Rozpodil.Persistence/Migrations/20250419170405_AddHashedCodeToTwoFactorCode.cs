using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rozpodil.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddHashedCodeToTwoFactorCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TwoFactorCodes_Users_UserId1",
                table: "TwoFactorCodes");

            migrationBuilder.DropIndex(
                name: "IX_TwoFactorCodes_UserId1",
                table: "TwoFactorCodes");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "TwoFactorCodes");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "TwoFactorCodes");

            migrationBuilder.AddColumn<string>(
                name: "HashedCode",
                table: "TwoFactorCodes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_TwoFactorCodes_Users_UserId",
                table: "TwoFactorCodes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TwoFactorCodes_Users_UserId",
                table: "TwoFactorCodes");

            migrationBuilder.DropColumn(
                name: "HashedCode",
                table: "TwoFactorCodes");

            migrationBuilder.AddColumn<int>(
                name: "Code",
                table: "TwoFactorCodes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "TwoFactorCodes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TwoFactorCodes_UserId1",
                table: "TwoFactorCodes",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_TwoFactorCodes_Users_UserId1",
                table: "TwoFactorCodes",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
