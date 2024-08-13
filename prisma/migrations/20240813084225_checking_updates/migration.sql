/*
  Warnings:

  - A unique constraint covering the columns `[product_id,promo_id]` on the table `ProductPromo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductPromo_product_id_promo_id_key" ON "ProductPromo"("product_id", "promo_id");
