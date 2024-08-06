/*
  Warnings:

  - Added the required column `promo_name` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promo" ADD COLUMN     "promo_name" TEXT NOT NULL;
