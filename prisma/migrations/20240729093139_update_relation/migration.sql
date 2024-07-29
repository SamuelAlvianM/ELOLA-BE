-- DropForeignKey
ALTER TABLE "DriverPartner" DROP CONSTRAINT "DriverPartner_store_id_fkey";

-- DropIndex
DROP INDEX "DriverPartner_store_id_partner_name_key";
