﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rozpodil.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CompletedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "completedAt",
                table: "Assignments",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "completedAt",
                table: "Assignments");
        }
    }
}
