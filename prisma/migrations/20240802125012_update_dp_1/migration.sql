/*
  Warnings:

  - A unique constraint covering the columns `[store_id,partner_name]` on the table `DriverPartner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DriverPartner_store_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "DriverPartner_store_id_partner_name_key" ON "DriverPartner"("store_id", "partner_name");
