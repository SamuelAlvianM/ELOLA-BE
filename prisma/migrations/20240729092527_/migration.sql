/*
  Warnings:

  - A unique constraint covering the columns `[tax_id,store_id,supplier_id]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inventory_id` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_id` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "inventory_id" INTEGER NOT NULL,
ADD COLUMN     "store_id" INTEGER NOT NULL,
ADD COLUMN     "tax_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_StoreToSupplier" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InventoryToSupplier" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SupplierToTax" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StoreToSupplier_AB_unique" ON "_StoreToSupplier"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreToSupplier_B_index" ON "_StoreToSupplier"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InventoryToSupplier_AB_unique" ON "_InventoryToSupplier"("A", "B");

-- CreateIndex
CREATE INDEX "_InventoryToSupplier_B_index" ON "_InventoryToSupplier"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SupplierToTax_AB_unique" ON "_SupplierToTax"("A", "B");

-- CreateIndex
CREATE INDEX "_SupplierToTax_B_index" ON "_SupplierToTax"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_tax_id_store_id_supplier_id_key" ON "Supplier"("tax_id", "store_id", "supplier_id");

-- AddForeignKey
ALTER TABLE "_StoreToSupplier" ADD CONSTRAINT "_StoreToSupplier_A_fkey" FOREIGN KEY ("A") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreToSupplier" ADD CONSTRAINT "_StoreToSupplier_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("supplier_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryToSupplier" ADD CONSTRAINT "_InventoryToSupplier_A_fkey" FOREIGN KEY ("A") REFERENCES "Inventory"("inventory_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryToSupplier" ADD CONSTRAINT "_InventoryToSupplier_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("supplier_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierToTax" ADD CONSTRAINT "_SupplierToTax_A_fkey" FOREIGN KEY ("A") REFERENCES "Supplier"("supplier_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierToTax" ADD CONSTRAINT "_SupplierToTax_B_fkey" FOREIGN KEY ("B") REFERENCES "Tax"("tax_id") ON DELETE CASCADE ON UPDATE CASCADE;
