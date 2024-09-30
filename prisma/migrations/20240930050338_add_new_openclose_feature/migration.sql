/*
  Warnings:

  - You are about to drop the column `branch_id` on the `open_close` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `open_close` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `open_close` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[outlet_id,start_time,end_time]` on the table `open_close` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "open_close" DROP CONSTRAINT "open_close_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "open_close" DROP CONSTRAINT "open_close_company_id_fkey";

-- DropForeignKey
ALTER TABLE "open_close" DROP CONSTRAINT "open_close_user_id_fkey";

-- DropIndex
DROP INDEX "open_close_user_id_company_id_branch_id_outlet_id_start_tim_key";

-- AlterTable
ALTER TABLE "open_close" DROP COLUMN "branch_id",
DROP COLUMN "company_id",
DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "saved_order" ADD COLUMN     "is_paid" BOOLEAN;

-- CreateTable
CREATE TABLE "open_close_user" (
    "open_close_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "open_close_user_pkey" PRIMARY KEY ("open_close_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "open_close_outlet_id_start_time_end_time_key" ON "open_close"("outlet_id", "start_time", "end_time");

-- AddForeignKey
ALTER TABLE "open_close_user" ADD CONSTRAINT "open_close_user_open_close_id_fkey" FOREIGN KEY ("open_close_id") REFERENCES "open_close"("open_close_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close_user" ADD CONSTRAINT "open_close_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
