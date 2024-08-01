/*
  Warnings:

  - You are about to drop the column `productPackage_id` on the `Tax` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Tax` table. All the data in the column will be lost.
  - You are about to drop the `ProductPackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductPackageTax` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductPackage" DROP CONSTRAINT "ProductPackage_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductPackageTax" DROP CONSTRAINT "ProductPackageTax_productPackage_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductPackageTax" DROP CONSTRAINT "ProductPackageTax_tax_id_fkey";

-- DropIndex
DROP INDEX "Tax_productPackage_id_product_id_key";

-- AlterTable
ALTER TABLE "Tax" DROP COLUMN "productPackage_id",
DROP COLUMN "product_id";

-- DropTable
DROP TABLE "ProductPackage";

-- DropTable
DROP TABLE "ProductPackageTax";

-- CreateTable
CREATE TABLE "_ProductToTax" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SupplierToTax" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTax_AB_unique" ON "_ProductToTax"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTax_B_index" ON "_ProductToTax"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SupplierToTax_AB_unique" ON "_SupplierToTax"("A", "B");

-- CreateIndex
CREATE INDEX "_SupplierToTax_B_index" ON "_SupplierToTax"("B");

-- AddForeignKey
ALTER TABLE "_ProductToTax" ADD CONSTRAINT "_ProductToTax_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTax" ADD CONSTRAINT "_ProductToTax_B_fkey" FOREIGN KEY ("B") REFERENCES "Tax"("tax_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierToTax" ADD CONSTRAINT "_SupplierToTax_A_fkey" FOREIGN KEY ("A") REFERENCES "Supplier"("supplier_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierToTax" ADD CONSTRAINT "_SupplierToTax_B_fkey" FOREIGN KEY ("B") REFERENCES "Tax"("tax_id") ON DELETE CASCADE ON UPDATE CASCADE;
