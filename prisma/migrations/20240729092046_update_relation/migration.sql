/*
  Warnings:

  - A unique constraint covering the columns `[productPackage_id,product_id]` on the table `Tax` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productPackage_id` to the `Tax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tax" ADD COLUMN     "productPackage_id" INTEGER NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_ProductToTax" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductPackageToTax" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTax_AB_unique" ON "_ProductToTax"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTax_B_index" ON "_ProductToTax"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductPackageToTax_AB_unique" ON "_ProductPackageToTax"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductPackageToTax_B_index" ON "_ProductPackageToTax"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Tax_productPackage_id_product_id_key" ON "Tax"("productPackage_id", "product_id");

-- AddForeignKey
ALTER TABLE "_ProductToTax" ADD CONSTRAINT "_ProductToTax_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTax" ADD CONSTRAINT "_ProductToTax_B_fkey" FOREIGN KEY ("B") REFERENCES "Tax"("tax_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPackageToTax" ADD CONSTRAINT "_ProductPackageToTax_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductPackage"("productPackage_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPackageToTax" ADD CONSTRAINT "_ProductPackageToTax_B_fkey" FOREIGN KEY ("B") REFERENCES "Tax"("tax_id") ON DELETE CASCADE ON UPDATE CASCADE;
