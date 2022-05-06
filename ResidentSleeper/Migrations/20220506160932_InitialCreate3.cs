using Microsoft.EntityFrameworkCore.Migrations;

namespace ResidentSleeper.Migrations
{
    public partial class InitialCreate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Orders",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Orders",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "orderId",
                table: "OrderDetails",
                newName: "orderID");

            migrationBuilder.RenameColumn(
                name: "flowerId",
                table: "OrderDetails",
                newName: "flowerID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "OrderDetails",
                newName: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Orders",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Orders",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "orderID",
                table: "OrderDetails",
                newName: "orderId");

            migrationBuilder.RenameColumn(
                name: "flowerID",
                table: "OrderDetails",
                newName: "flowerId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "OrderDetails",
                newName: "Id");
        }
    }
}
