/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `driver_partner` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `is_tax_included` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `order_type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `promo_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_number` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `rounding` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sub_total` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `tax_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `tax_name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Transaction` table. All the data in the column will be lost.
  - The `transaction_id` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `item_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `payment_type` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customer_name` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wa_number` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_driver_partner_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_promo_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_tax_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- DropIndex
DROP INDEX "Transaction_receipt_number_key";

-- DropIndex
DROP INDEX "Transaction_store_id_user_id_driver_partner_receipt_number_key";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "driver_partner",
DROP COLUMN "is_tax_included",
DROP COLUMN "order_type",
DROP COLUMN "product_id",
DROP COLUMN "promo_id",
DROP COLUMN "receipt_number",
DROP COLUMN "rounding",
DROP COLUMN "store_id",
DROP COLUMN "sub_total",
DROP COLUMN "tax_id",
DROP COLUMN "tax_name",
DROP COLUMN "user_id",
ADD COLUMN     "item_id" INTEGER NOT NULL,
ADD COLUMN     "order_id" INTEGER NOT NULL,
DROP COLUMN "transaction_id",
ADD COLUMN     "transaction_id" SERIAL NOT NULL,
ALTER COLUMN "grand_total" SET DATA TYPE BIGINT,
ALTER COLUMN "payment_type" SET NOT NULL,
ALTER COLUMN "change" SET DATA TYPE BIGINT,
ALTER COLUMN "customer_name" SET NOT NULL,
ALTER COLUMN "wa_number" SET NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id");

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "driver_partner_id" INTEGER NOT NULL,
    "order_type" "Order_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Items" (
    "item_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sub_total" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Items_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "SavedOrder" (
    "saved_order_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "item_id" INTEGER,
    "transaction_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "SavedOrder_pkey" PRIMARY KEY ("saved_order_id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_driver_partner_id_fkey" FOREIGN KEY ("driver_partner_id") REFERENCES "DriverPartner"("driver_partner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedOrder" ADD CONSTRAINT "SavedOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedOrder" ADD CONSTRAINT "SavedOrder_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedOrder" ADD CONSTRAINT "SavedOrder_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("transaction_id") ON DELETE SET NULL ON UPDATE CASCADE;
