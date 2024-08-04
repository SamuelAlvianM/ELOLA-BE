/*
  Warnings:

  - You are about to drop the column `tax` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `tax_id` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tax_name]` on the table `Tax` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tax_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_tax_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "tax",
DROP COLUMN "tax_id",
ADD COLUMN     "tax_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tax_tax_name_key" ON "Tax"("tax_name");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_tax_name_fkey" FOREIGN KEY ("tax_name") REFERENCES "Tax"("tax_name") ON DELETE RESTRICT ON UPDATE CASCADE;
