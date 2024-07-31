-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'OWNER', 'STAFF', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "super_admin_id" SERIAL NOT NULL,
    "admin_name" TEXT NOT NULL,
    "admin_email" TEXT NOT NULL,
    "admin_pin" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("super_admin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_admin_email_key" ON "SuperAdmin"("admin_email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_admin_pin_key" ON "SuperAdmin"("admin_pin");
