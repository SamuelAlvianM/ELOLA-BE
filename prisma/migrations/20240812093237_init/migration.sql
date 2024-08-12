/*
  Warnings:

  - Made the column `product_id` on table `Promo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Promo" ALTER COLUMN "product_id" SET NOT NULL;
