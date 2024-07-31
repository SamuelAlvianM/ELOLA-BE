/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `SuperAdmin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuperAdmin" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_password_key" ON "SuperAdmin"("password");
