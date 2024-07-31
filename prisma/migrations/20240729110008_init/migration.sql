/*
  Warnings:

  - A unique constraint covering the columns `[store_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[store_id,product_category_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `Promo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Payment_store_id_payment_name_key";

-- DropIndex
DROP INDEX "Product_store_id_product_category_id_product_name_key";

-- DropIndex
DROP INDEX "Promo_product_id_promo_type_start_date_end_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_store_id_key" ON "Payment"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_store_id_product_category_id_key" ON "Product"("store_id", "product_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Promo_product_id_key" ON "Promo"("product_id");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;
