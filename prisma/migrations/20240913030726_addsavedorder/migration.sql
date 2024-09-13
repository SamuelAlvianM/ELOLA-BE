-- AlterTable
ALTER TABLE "TransactionProduct" ADD COLUMN     "saved_order_id" INTEGER;

-- AddForeignKey
ALTER TABLE "TransactionProduct" ADD CONSTRAINT "TransactionProduct_saved_order_id_fkey" FOREIGN KEY ("saved_order_id") REFERENCES "SavedOrder"("saved_order_id") ON DELETE SET NULL ON UPDATE CASCADE;
