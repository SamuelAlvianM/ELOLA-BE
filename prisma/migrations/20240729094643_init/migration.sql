/*
  Warnings:

  - A unique constraint covering the columns `[store_id]` on the table `DriverPartner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_DriverPartnerToStore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DriverPartnerToStore_AB_unique" ON "_DriverPartnerToStore"("A", "B");

-- CreateIndex
CREATE INDEX "_DriverPartnerToStore_B_index" ON "_DriverPartnerToStore"("B");

-- CreateIndex
CREATE UNIQUE INDEX "DriverPartner_store_id_key" ON "DriverPartner"("store_id");

-- AddForeignKey
ALTER TABLE "_DriverPartnerToStore" ADD CONSTRAINT "_DriverPartnerToStore_A_fkey" FOREIGN KEY ("A") REFERENCES "DriverPartner"("driver_partner_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DriverPartnerToStore" ADD CONSTRAINT "_DriverPartnerToStore_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE CASCADE;
