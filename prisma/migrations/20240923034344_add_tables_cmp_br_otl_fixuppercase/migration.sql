/*
  Warnings:

  - You are about to drop the `DriverPartner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DriverPartnerStore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventorySupplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenClose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductPromo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductTax` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Promo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreSupplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuperAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupplierTax` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tax` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "has_role" AS ENUM ('owner', 'hr', 'head', 'spv', 'staff', 'cashier', 'waiter');

-- CreateEnum
CREATE TYPE "hierarchy" AS ENUM ('company', 'branch', 'outlet');

-- CreateEnum
CREATE TYPE "tax_type" AS ENUM ('service', 'vat');

-- CreateEnum
CREATE TYPE "payment_type" AS ENUM ('bank_transfer', 'e_payment', 'cash');

-- CreateEnum
CREATE TYPE "order_type" AS ENUM ('order', 'take_away');

-- CreateEnum
CREATE TYPE "order_payment_type" AS ENUM ('cash', 'bank_transfer', 'e_payment');

-- CreateEnum
CREATE TYPE "promo_type" AS ENUM ('discount', 'sales');

-- DropForeignKey
ALTER TABLE "DriverPartner" DROP CONSTRAINT "DriverPartner_store_id_fkey";

-- DropForeignKey
ALTER TABLE "DriverPartnerStore" DROP CONSTRAINT "DriverPartnerStore_driver_partner_id_fkey";

-- DropForeignKey
ALTER TABLE "DriverPartnerStore" DROP CONSTRAINT "DriverPartnerStore_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_store_id_fkey";

-- DropForeignKey
ALTER TABLE "InventorySupplier" DROP CONSTRAINT "InventorySupplier_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "InventorySupplier" DROP CONSTRAINT "InventorySupplier_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "OpenClose" DROP CONSTRAINT "OpenClose_close_by_fkey";

-- DropForeignKey
ALTER TABLE "OpenClose" DROP CONSTRAINT "OpenClose_open_by_fkey";

-- DropForeignKey
ALTER TABLE "OpenClose" DROP CONSTRAINT "OpenClose_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_store_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_store_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductPromo" DROP CONSTRAINT "ProductPromo_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductPromo" DROP CONSTRAINT "ProductPromo_promo_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductTax" DROP CONSTRAINT "ProductTax_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductTax" DROP CONSTRAINT "ProductTax_tax_id_fkey";

-- DropForeignKey
ALTER TABLE "SavedOrder" DROP CONSTRAINT "SavedOrder_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StoreStaff" DROP CONSTRAINT "StoreStaff_store_id_fkey";

-- DropForeignKey
ALTER TABLE "StoreStaff" DROP CONSTRAINT "StoreStaff_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StoreSupplier" DROP CONSTRAINT "StoreSupplier_store_id_fkey";

-- DropForeignKey
ALTER TABLE "StoreSupplier" DROP CONSTRAINT "StoreSupplier_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "SupplierTax" DROP CONSTRAINT "SupplierTax_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "SupplierTax" DROP CONSTRAINT "SupplierTax_tax_id_fkey";

-- DropForeignKey
ALTER TABLE "Tax" DROP CONSTRAINT "Tax_supplierSupplier_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_driver_partner_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_tax_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionProduct" DROP CONSTRAINT "TransactionProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionProduct" DROP CONSTRAINT "TransactionProduct_saved_order_id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionProduct" DROP CONSTRAINT "TransactionProduct_transaction_id_fkey";

-- DropTable
DROP TABLE "DriverPartner";

-- DropTable
DROP TABLE "DriverPartnerStore";

-- DropTable
DROP TABLE "Inventory";

-- DropTable
DROP TABLE "InventorySupplier";

-- DropTable
DROP TABLE "OpenClose";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductCategory";

-- DropTable
DROP TABLE "ProductPromo";

-- DropTable
DROP TABLE "ProductTax";

-- DropTable
DROP TABLE "Promo";

-- DropTable
DROP TABLE "SavedOrder";

-- DropTable
DROP TABLE "Store";

-- DropTable
DROP TABLE "StoreStaff";

-- DropTable
DROP TABLE "StoreSupplier";

-- DropTable
DROP TABLE "SuperAdmin";

-- DropTable
DROP TABLE "Supplier";

-- DropTable
DROP TABLE "SupplierTax";

-- DropTable
DROP TABLE "Tax";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "TransactionProduct";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Order_payment_type";

-- DropEnum
DROP TYPE "Order_type";

-- DropEnum
DROP TYPE "Payment_type";

-- DropEnum
DROP TYPE "Promo_type";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Tax_type";

-- CreateTable
CREATE TABLE "super_admin" (
    "super_admin_id" SERIAL NOT NULL,
    "admin_name" VARCHAR(50) NOT NULL,
    "admin_email" VARCHAR(50) NOT NULL,
    "admin_pin" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,

    CONSTRAINT "super_admin_pkey" PRIMARY KEY ("super_admin_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "pin" TEXT NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "role" "has_role" NOT NULL,
    "class" "hierarchy" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "company_id" INTEGER NOT NULL,
    "outlet_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "company" (
    "company_id" SERIAL NOT NULL,
    "company_name" VARCHAR(50) NOT NULL,
    "company_owner" VARCHAR(30) NOT NULL,
    "company_address" TEXT NOT NULL,
    "company_email" VARCHAR(50) NOT NULL,
    "company_phone" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "branch" (
    "branch_id" SERIAL NOT NULL,
    "branch_name" VARCHAR(50) NOT NULL,
    "branch_address" TEXT NOT NULL,
    "branch_email" VARCHAR(50) NOT NULL,
    "branch_phone" VARCHAR(30) NOT NULL,
    "branch_area" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "outlet" (
    "outlet_id" SERIAL NOT NULL,
    "outlet_name" VARCHAR(50) NOT NULL,
    "outlet_address" TEXT NOT NULL,
    "outlet_email" VARCHAR(50) NOT NULL,
    "outlet_phone" VARCHAR(30) NOT NULL,
    "outlet_area" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "company_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,

    CONSTRAINT "outlet_pkey" PRIMARY KEY ("outlet_id")
);

-- CreateTable
CREATE TABLE "store" (
    "store_id" SERIAL NOT NULL,
    "outlet_id" INTEGER NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "store_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "open_close" (
    "open_close_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "company_id" INTEGER,
    "branch_id" INTEGER,
    "outlet_id" INTEGER,
    "is_cashier_open" BOOLEAN NOT NULL DEFAULT false,
    "open_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "open_by" INTEGER,
    "close_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "close_by" INTEGER,
    "bill_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "open_close_pkey" PRIMARY KEY ("open_close_id")
);

-- CreateTable
CREATE TABLE "tax" (
    "tax_id" SERIAL NOT NULL,
    "tax_type" "tax_type" NOT NULL,
    "tax_name" TEXT NOT NULL,
    "tax_value" INTEGER,
    "service_value" INTEGER DEFAULT 0,
    "tax_status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "supplier_supplier_id" INTEGER,

    CONSTRAINT "tax_pkey" PRIMARY KEY ("tax_id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "product_category_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("product_category_id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "inventory_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "inventory_name" TEXT NOT NULL,
    "in_storage_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value_stored" INTEGER NOT NULL,
    "value_out" INTEGER NOT NULL,
    "out_storage_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("inventory_id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "supplier_id" SERIAL NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "supplier_product" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "driver_partner" (
    "driver_partner_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "partner_name" TEXT NOT NULL,
    "benefit" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "driver_partner_pkey" PRIMARY KEY ("driver_partner_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_id" SERIAL NOT NULL,
    "store_id" INTEGER,
    "payment_name" TEXT NOT NULL,
    "payment_type" "payment_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "product_category_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" INTEGER NOT NULL,
    "cost_of_good_sold" INTEGER NOT NULL,
    "product_code" INTEGER NOT NULL,
    "product_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "transaction_product" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "saved_order_id" INTEGER,

    CONSTRAINT "transaction_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "transaction_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,
    "driver_partner" TEXT,
    "order_type" "order_type" NOT NULL,
    "receipt_number" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "change" INTEGER,
    "sub_total" DOUBLE PRECISION NOT NULL,
    "grand_total" DOUBLE PRECISION NOT NULL,
    "payment_type" "order_payment_type" NOT NULL,
    "customer_name" TEXT NOT NULL,
    "whatsapp_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "promo" (
    "promo_id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "promo_type" "promo_type" NOT NULL,
    "promo_value" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "promo_name" TEXT NOT NULL,

    CONSTRAINT "promo_pkey" PRIMARY KEY ("promo_id")
);

-- CreateTable
CREATE TABLE "product_promo" (
    "product_id" INTEGER NOT NULL,
    "promo_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "product_promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_tax" (
    "product_id" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,
    "product_tax_id" SERIAL NOT NULL,

    CONSTRAINT "product_tax_pkey" PRIMARY KEY ("product_tax_id")
);

-- CreateTable
CREATE TABLE "driver_partner_store" (
    "driver_partner_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "driver_partner_store_pkey" PRIMARY KEY ("driver_partner_id","store_id")
);

-- CreateTable
CREATE TABLE "store_supplier" (
    "store_id" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "store_supplier_pkey" PRIMARY KEY ("store_id","supplier_id")
);

-- CreateTable
CREATE TABLE "inventory_supplier" (
    "inventory_id" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "inventory_supplier_pkey" PRIMARY KEY ("inventory_id","supplier_id")
);

-- CreateTable
CREATE TABLE "supplier_tax" (
    "supplier_id" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,

    CONSTRAINT "supplier_tax_pkey" PRIMARY KEY ("supplier_id","tax_id")
);

-- CreateTable
CREATE TABLE "store_staff" (
    "store_staff_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "store_staff_pkey" PRIMARY KEY ("store_staff_id")
);

-- CreateTable
CREATE TABLE "saved_order" (
    "saved_order_id" SERIAL NOT NULL,
    "transaction_id" INTEGER,
    "is_done" BOOLEAN DEFAULT false,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "saved_order_pkey" PRIMARY KEY ("saved_order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "super_admin_admin_email_key" ON "super_admin"("admin_email");

-- CreateIndex
CREATE UNIQUE INDEX "super_admin_admin_pin_key" ON "super_admin"("admin_pin");

-- CreateIndex
CREATE UNIQUE INDEX "super_admin_password_key" ON "super_admin"("password");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_name_key" ON "user"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_pin_key" ON "user"("pin");

-- CreateIndex
CREATE UNIQUE INDEX "company_company_name_key" ON "company"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "branch_branch_name_key" ON "branch"("branch_name");

-- CreateIndex
CREATE UNIQUE INDEX "outlet_outlet_name_key" ON "outlet"("outlet_name");

-- CreateIndex
CREATE UNIQUE INDEX "store_store_name_key" ON "store"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "store_store_address_key" ON "store"("store_address");

-- CreateIndex
CREATE UNIQUE INDEX "open_close_user_id_company_id_branch_id_outlet_id_open_date_key" ON "open_close"("user_id", "company_id", "branch_id", "outlet_id", "open_date", "close_date");

-- CreateIndex
CREATE UNIQUE INDEX "tax_tax_name_key" ON "tax"("tax_name");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_product_id_store_id_key" ON "inventory"("product_id", "store_id");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_supplier_id_key" ON "supplier"("supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_email_key" ON "supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "driver_partner_partner_name_key" ON "driver_partner"("partner_name");

-- CreateIndex
CREATE UNIQUE INDEX "driver_partner_store_id_partner_name_key" ON "driver_partner"("store_id", "partner_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_product_name_key" ON "product"("product_name");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_product_transaction_id_product_id_key" ON "transaction_product"("transaction_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_receipt_number_key" ON "transaction"("receipt_number");

-- CreateIndex
CREATE UNIQUE INDEX "product_promo_product_id_promo_id_key" ON "product_promo"("product_id", "promo_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_tax_product_id_tax_id_key" ON "product_tax"("product_id", "tax_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outlet" ADD CONSTRAINT "outlet_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outlet" ADD CONSTRAINT "outlet_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close" ADD CONSTRAINT "open_close_close_by_fkey" FOREIGN KEY ("close_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close" ADD CONSTRAINT "open_close_open_by_fkey" FOREIGN KEY ("open_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close" ADD CONSTRAINT "open_close_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close" ADD CONSTRAINT "open_close_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close" ADD CONSTRAINT "open_close_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax" ADD CONSTRAINT "tax_supplier_supplier_id_fkey" FOREIGN KEY ("supplier_supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_partner" ADD CONSTRAINT "driver_partner_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("product_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_product" ADD CONSTRAINT "transaction_product_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_product" ADD CONSTRAINT "transaction_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_product" ADD CONSTRAINT "transaction_product_saved_order_id_fkey" FOREIGN KEY ("saved_order_id") REFERENCES "saved_order"("saved_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_driver_partner_fkey" FOREIGN KEY ("driver_partner") REFERENCES "driver_partner"("partner_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_promo" ADD CONSTRAINT "product_promo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_promo" ADD CONSTRAINT "product_promo_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "promo"("promo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tax" ADD CONSTRAINT "product_tax_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tax" ADD CONSTRAINT "product_tax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_partner_store" ADD CONSTRAINT "driver_partner_store_driver_partner_id_fkey" FOREIGN KEY ("driver_partner_id") REFERENCES "driver_partner"("driver_partner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_partner_store" ADD CONSTRAINT "driver_partner_store_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_supplier" ADD CONSTRAINT "store_supplier_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_supplier" ADD CONSTRAINT "store_supplier_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_supplier" ADD CONSTRAINT "inventory_supplier_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("inventory_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_supplier" ADD CONSTRAINT "inventory_supplier_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_tax" ADD CONSTRAINT "supplier_tax_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_tax" ADD CONSTRAINT "supplier_tax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_staff" ADD CONSTRAINT "store_staff_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_staff" ADD CONSTRAINT "store_staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_order" ADD CONSTRAINT "saved_order_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("transaction_id") ON DELETE SET NULL ON UPDATE CASCADE;
