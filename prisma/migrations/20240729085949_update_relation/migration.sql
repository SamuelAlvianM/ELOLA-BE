/*
  Warnings:

  - You are about to drop the column `service` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `ProductPackage` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `ProductPackage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "service",
DROP COLUMN "tax";

-- AlterTable
ALTER TABLE "ProductPackage" DROP COLUMN "service",
DROP COLUMN "tax";
