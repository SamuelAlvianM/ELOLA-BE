-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_store_id_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "store_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE SET NULL ON UPDATE CASCADE;
