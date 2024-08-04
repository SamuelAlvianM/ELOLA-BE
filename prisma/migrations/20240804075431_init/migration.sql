/*
  Warnings:

  - A unique constraint covering the columns `[product_name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "product_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_name_key" ON "Product"("product_name");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "Product"("product_name") ON DELETE RESTRICT ON UPDATE CASCADE;
