/*
  Warnings:

  - You are about to drop the `ProductPromo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductPromo" DROP CONSTRAINT "ProductPromo_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductPromo" DROP CONSTRAINT "ProductPromo_promo_id_fkey";

-- DropTable
DROP TABLE "ProductPromo";
