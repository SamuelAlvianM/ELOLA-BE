/*
  Warnings:

  - The primary key for the `ProductPromo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_promo_id` on the `ProductPromo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProductPromo_product_id_promo_id_key";

-- AlterTable
ALTER TABLE "ProductPromo" DROP CONSTRAINT "ProductPromo_pkey",
DROP COLUMN "product_promo_id",
ADD CONSTRAINT "ProductPromo_pkey" PRIMARY KEY ("product_id", "promo_id");
