/*
  Warnings:

  - A unique constraint covering the columns `[store_id,partner_name]` on the table `DriverPartner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DriverPartner_store_id_partner_name_key" ON "DriverPartner"("store_id", "partner_name");

-- AddForeignKey
ALTER TABLE "DriverPartner" ADD CONSTRAINT "DriverPartner_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;
