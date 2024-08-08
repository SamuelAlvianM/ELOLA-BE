/*
  Warnings:

  - The primary key for the `ProductPromo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[product_id,promo_id]` on the table `ProductPromo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductPromo" DROP CONSTRAINT "ProductPromo_pkey",
ADD COLUMN     "product_promo_id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductPromo_pkey" PRIMARY KEY ("product_promo_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPromo_product_id_promo_id_key" ON "ProductPromo"("product_id", "promo_id");
