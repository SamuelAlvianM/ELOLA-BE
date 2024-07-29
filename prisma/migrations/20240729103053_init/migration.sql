/*
  Warnings:

  - You are about to drop the column `store_id` on the `Supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tax_id,supplier_id]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Supplier_tax_id_store_id_supplier_id_key";

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "store_id";

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_tax_id_supplier_id_key" ON "Supplier"("tax_id", "supplier_id");
