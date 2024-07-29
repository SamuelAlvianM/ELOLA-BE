/*
  Warnings:

  - You are about to drop the column `inventory_id` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the `_InventoryToSupplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InventoryToSupplier" DROP CONSTRAINT "_InventoryToSupplier_A_fkey";

-- DropForeignKey
ALTER TABLE "_InventoryToSupplier" DROP CONSTRAINT "_InventoryToSupplier_B_fkey";

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "inventory_id";

-- DropTable
DROP TABLE "_InventoryToSupplier";
