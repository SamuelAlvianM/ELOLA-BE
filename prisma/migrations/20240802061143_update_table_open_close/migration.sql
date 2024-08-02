-- DropForeignKey
ALTER TABLE "OpenClose" DROP CONSTRAINT "OpenClose_close_by_fkey";

-- DropForeignKey
ALTER TABLE "OpenClose" DROP CONSTRAINT "OpenClose_open_by_fkey";

-- AlterTable
ALTER TABLE "OpenClose" ALTER COLUMN "open_date" DROP NOT NULL,
ALTER COLUMN "open_by" DROP NOT NULL,
ALTER COLUMN "close_date" DROP NOT NULL,
ALTER COLUMN "close_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OpenClose" ADD CONSTRAINT "OpenClose_open_by_fkey" FOREIGN KEY ("open_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenClose" ADD CONSTRAINT "OpenClose_close_by_fkey" FOREIGN KEY ("close_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
