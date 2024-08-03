/*
  Warnings:

  - The primary key for the `ProductTax` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_ProductToTax` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SupplierToTax` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[product_id,tax_id]` on the table `ProductTax` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Promo" DROP CONSTRAINT "Promo_product_id_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTax" DROP CONSTRAINT "_ProductToTax_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTax" DROP CONSTRAINT "_ProductToTax_B_fkey";

-- DropForeignKey
ALTER TABLE "_SupplierToTax" DROP CONSTRAINT "_SupplierToTax_A_fkey";

-- DropForeignKey
ALTER TABLE "_SupplierToTax" DROP CONSTRAINT "_SupplierToTax_B_fkey";

-- DropIndex
DROP INDEX "Promo_product_id_key";

-- AlterTable
ALTER TABLE "ProductTax" DROP CONSTRAINT "ProductTax_pkey",
ADD COLUMN     "product_tax_id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductTax_pkey" PRIMARY KEY ("product_tax_id");

-- AlterTable
ALTER TABLE "Tax" ADD COLUMN     "supplierSupplier_id" INTEGER;

-- DropTable
DROP TABLE "_ProductToTax";

-- DropTable
DROP TABLE "_SupplierToTax";

-- CreateTable
CREATE TABLE "ProductPromo" (
    "product_promo_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "promo_id" INTEGER NOT NULL,

    CONSTRAINT "ProductPromo_pkey" PRIMARY KEY ("product_promo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductPromo_product_id_promo_id_key" ON "ProductPromo"("product_id", "promo_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTax_product_id_tax_id_key" ON "ProductTax"("product_id", "tax_id");

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_supplierSupplier_id_fkey" FOREIGN KEY ("supplierSupplier_id") REFERENCES "Supplier"("supplier_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPromo" ADD CONSTRAINT "ProductPromo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPromo" ADD CONSTRAINT "ProductPromo_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promo"("promo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
