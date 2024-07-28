/*
  Warnings:

  - A unique constraint covering the columns `[store_id,payment_name]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[store_id,product_category_id,product_name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,promo_type,start_date,end_date]` on the table `Promo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Payment_store_id_key";

-- DropIndex
DROP INDEX "Product_store_id_product_category_id_key";

-- DropIndex
DROP INDEX "Promo_product_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_store_id_payment_name_key" ON "Payment"("store_id", "payment_name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_store_id_product_category_id_product_name_key" ON "Product"("store_id", "product_category_id", "product_name");

-- CreateIndex
CREATE UNIQUE INDEX "Promo_product_id_promo_type_start_date_end_date_key" ON "Promo"("product_id", "promo_type", "start_date", "end_date");

-- AddForeignKey
ALTER TABLE "ProductPackage" ADD CONSTRAINT "ProductPackage_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
