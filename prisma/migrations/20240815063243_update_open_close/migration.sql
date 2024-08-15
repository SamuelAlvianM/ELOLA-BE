/*
  Warnings:

  - A unique constraint covering the columns `[user_id,store_id,open_date,close_date]` on the table `OpenClose` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OpenClose_user_id_store_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "OpenClose_user_id_store_id_open_date_close_date_key" ON "OpenClose"("user_id", "store_id", "open_date", "close_date");
