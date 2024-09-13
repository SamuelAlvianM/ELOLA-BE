/*
  Warnings:

  - You are about to drop the column `quantity` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `change` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_quantity` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "quantity",
ADD COLUMN     "change" INTEGER NOT NULL,
ADD COLUMN     "total_quantity" INTEGER NOT NULL;
