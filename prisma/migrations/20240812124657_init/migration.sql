/*
  Warnings:

  - The primary key for the `ProductPromo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ProductPromo" DROP CONSTRAINT "ProductPromo_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductPromo_pkey" PRIMARY KEY ("id");
