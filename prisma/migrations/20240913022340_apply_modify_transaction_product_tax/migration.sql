/*
  Warnings:

  - You are about to drop the column `change` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `service_value` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_product_id_fkey";

-- DropIndex
DROP INDEX "Transaction_store_id_user_id_driver_partner_key";

-- AlterTable
ALTER TABLE "Tax" ADD COLUMN     "service_value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "change",
DROP COLUMN "product_id";

-- CreateTable
CREATE TABLE "TransactionProduct" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "TransactionProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionProduct_transaction_id_product_id_key" ON "TransactionProduct"("transaction_id", "product_id");

-- AddForeignKey
ALTER TABLE "TransactionProduct" ADD CONSTRAINT "TransactionProduct_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionProduct" ADD CONSTRAINT "TransactionProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
