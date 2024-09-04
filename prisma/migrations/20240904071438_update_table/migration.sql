/*
  Warnings:

  - The values [Retail,Take_away] on the enum `Order_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [Bank,E-Payment] on the enum `Payment_type` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `c_o_g_s` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `rounding` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `tax_name` on the `Transaction` table. All the data in the column will be lost.
  - The `transaction_id` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[receipt_number]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp_number` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Order_type_new" AS ENUM ('Order', 'TakeAway');
ALTER TABLE "Transaction" ALTER COLUMN "order_type" TYPE "Order_type_new" USING ("order_type"::text::"Order_type_new");
ALTER TYPE "Order_type" RENAME TO "Order_type_old";
ALTER TYPE "Order_type_new" RENAME TO "Order_type";
DROP TYPE "Order_type_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Payment_type_new" AS ENUM ('Transfer', 'EPayment', 'Cash');
ALTER TABLE "Payment" ALTER COLUMN "payment_type" TYPE "Payment_type_new" USING ("payment_type"::text::"Payment_type_new");
ALTER TYPE "Payment_type" RENAME TO "Payment_type_old";
ALTER TYPE "Payment_type_new" RENAME TO "Payment_type";
DROP TYPE "Payment_type_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_driver_partner_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_product_name_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_tax_name_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "c_o_g_s",
DROP COLUMN "discount",
DROP COLUMN "product_name",
DROP COLUMN "rounding",
DROP COLUMN "service",
DROP COLUMN "tax_name",
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "tax_id" INTEGER NOT NULL,
ADD COLUMN     "whatsapp_number" TEXT NOT NULL,
DROP COLUMN "transaction_id",
ADD COLUMN     "transaction_id" SERIAL NOT NULL,
ALTER COLUMN "driver_partner" DROP NOT NULL,
ALTER COLUMN "receipt_number" DROP DEFAULT,
ALTER COLUMN "receipt_number" SET DATA TYPE TEXT,
ALTER COLUMN "grand_total" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id");
DROP SEQUENCE "Transaction_receipt_number_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_receipt_number_key" ON "Transaction"("receipt_number");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_driver_partner_fkey" FOREIGN KEY ("driver_partner") REFERENCES "DriverPartner"("partner_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;
