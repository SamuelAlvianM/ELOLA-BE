/*
  Warnings:

  - You are about to drop the column `tax_id` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the `_ProductPackageToTax` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToTax` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SupplierToTax` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[supplier_id]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ProductPackageToTax" DROP CONSTRAINT "_ProductPackageToTax_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductPackageToTax" DROP CONSTRAINT "_ProductPackageToTax_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTax" DROP CONSTRAINT "_ProductToTax_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTax" DROP CONSTRAINT "_ProductToTax_B_fkey";

-- DropForeignKey
ALTER TABLE "_SupplierToTax" DROP CONSTRAINT "_SupplierToTax_A_fkey";

-- DropForeignKey
ALTER TABLE "_SupplierToTax" DROP CONSTRAINT "_SupplierToTax_B_fkey";

-- DropIndex
DROP INDEX "Supplier_tax_id_supplier_id_key";

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "tax_id";

-- DropTable
DROP TABLE "_ProductPackageToTax";

-- DropTable
DROP TABLE "_ProductToTax";

-- DropTable
DROP TABLE "_SupplierToTax";

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_supplier_id_key" ON "Supplier"("supplier_id");
