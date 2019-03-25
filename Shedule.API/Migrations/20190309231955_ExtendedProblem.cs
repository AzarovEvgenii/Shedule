using Microsoft.EntityFrameworkCore.Migrations;

namespace Shedule.API.Migrations
{
    public partial class ExtendedProblem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Problems",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Problems",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Problems",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Problems");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Problems");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Problems");
        }
    }
}
