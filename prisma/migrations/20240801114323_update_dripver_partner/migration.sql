/*
  Warnings:

  - You are about to drop the column `tax_id` on the `DriverPartner` table. All the data in the column will be lost.
  - You are about to drop the `_DriverPartnerToStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DriverPartnerToStore" DROP CONSTRAINT "_DriverPartnerToStore_A_fkey";

-- DropForeignKey
ALTER TABLE "_DriverPartnerToStore" DROP CONSTRAINT "_DriverPartnerToStore_B_fkey";

-- AlterTable
ALTER TABLE "DriverPartner" DROP COLUMN "tax_id";

-- DropTable
DROP TABLE "_DriverPartnerToStore";

-- CreateTable
CREATE TABLE "DriverPartnerStore" (
    "driver_partner_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "DriverPartnerStore_pkey" PRIMARY KEY ("driver_partner_id","store_id")
);

-- AddForeignKey
ALTER TABLE "DriverPartner" ADD CONSTRAINT "DriverPartner_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverPartnerStore" ADD CONSTRAINT "DriverPartnerStore_driver_partner_id_fkey" FOREIGN KEY ("driver_partner_id") REFERENCES "DriverPartner"("driver_partner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverPartnerStore" ADD CONSTRAINT "DriverPartnerStore_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;
