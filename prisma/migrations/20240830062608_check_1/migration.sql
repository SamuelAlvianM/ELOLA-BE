/*
  Warnings:

  - The values [Retail,Take_away] on the enum `Order_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `customer_name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `wa_number` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `customer_name` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Order_type_new" AS ENUM ('RETAIL', 'TAKEAWAY');
ALTER TABLE "Order" ALTER COLUMN "order_type" TYPE "Order_type_new" USING ("order_type"::text::"Order_type_new");
ALTER TYPE "Order_type" RENAME TO "Order_type_old";
ALTER TYPE "Order_type_new" RENAME TO "Order_type";
DROP TYPE "Order_type_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_driver_partner_id_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "wa_number" TEXT,
ALTER COLUMN "driver_partner_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "customer_name",
DROP COLUMN "wa_number";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_driver_partner_id_fkey" FOREIGN KEY ("driver_partner_id") REFERENCES "DriverPartner"("driver_partner_id") ON DELETE SET NULL ON UPDATE CASCADE;
