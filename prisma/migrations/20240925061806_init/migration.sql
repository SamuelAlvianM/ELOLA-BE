-- CreateEnum
CREATE TYPE "has_role" AS ENUM ('owner', 'hr', 'head', 'manager', 'spv', 'staff', 'cashier', 'waiter');

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

-- CreateTable
CREATE TABLE "super_admin" (
    "super_admin_id" SERIAL NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'super_admin',
    "admin_email" VARCHAR(50) NOT NULL,
    "admin_name" VARCHAR(50) NOT NULL,
    "admin_pin" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "super_admin_pkey" PRIMARY KEY ("super_admin_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "pin" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "has_role" NOT NULL,
    "class" "hierarchy" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "company_id" TEXT,
    "outlet_id" TEXT,
    "branch_id" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "company" (
    "company_id" TEXT NOT NULL,
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
    "branch_id" TEXT NOT NULL,
    "branch_name" VARCHAR(50) NOT NULL,
    "branch_address" TEXT NOT NULL,
    "branch_email" VARCHAR(50) NOT NULL,
    "branch_phone" VARCHAR(30) NOT NULL,
    "branch_area" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "company_id" TEXT,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "outlet" (
    "outlet_id" TEXT NOT NULL,
    "outlet_name" VARCHAR(50) NOT NULL,
    "outlet_address" TEXT NOT NULL,
    "outlet_email" VARCHAR(50) NOT NULL,
    "outlet_phone" VARCHAR(30) NOT NULL,
    "outlet_area" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "company_id" TEXT,
    "branch_id" TEXT,

    CONSTRAINT "outlet_pkey" PRIMARY KEY ("outlet_id")
);

-- CreateTable
CREATE TABLE "open_close" (
    "open_close_id" SERIAL NOT NULL,
    "is_cashier_open" BOOLEAN NOT NULL DEFAULT false,
    "start_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "bill_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT,
    "company_id" TEXT,
    "branch_id" TEXT,
    "outlet_id" TEXT,

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
    "outlet_id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("product_category_id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "inventory_id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "outlet_id" TEXT NOT NULL,
    "inventory_name" TEXT NOT NULL,
    "in_storage_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value_in" INTEGER,
    "value_out" INTEGER,
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
    "outlet_id" TEXT NOT NULL,
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
    "outlet_id" TEXT,
    "payment_name" TEXT NOT NULL,
    "payment_type" "payment_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" TEXT NOT NULL,
    "outlet_id" TEXT NOT NULL,
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
CREATE TABLE "order_product" (
    "order_product_id" SERIAL NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "saved_order_id" INTEGER,

    CONSTRAINT "order_product_pkey" PRIMARY KEY ("order_product_id")
);

-- CreateTable
CREATE TABLE "order" (
    "order_id" TEXT NOT NULL,
    "outlet_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
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

    CONSTRAINT "order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "promo" (
    "promo_id" SERIAL NOT NULL,
    "product_id" TEXT,
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
    "product_id" TEXT NOT NULL,
    "promo_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "product_promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_tax" (
    "product_id" TEXT NOT NULL,
    "tax_id" INTEGER NOT NULL,
    "product_tax_id" SERIAL NOT NULL,

    CONSTRAINT "product_tax_pkey" PRIMARY KEY ("product_tax_id")
);

-- CreateTable
CREATE TABLE "driver_partner_outlet" (
    "driver_partner_id" INTEGER NOT NULL,
    "outlet_id" TEXT NOT NULL,

    CONSTRAINT "driver_partner_outlet_pkey" PRIMARY KEY ("driver_partner_id","outlet_id")
);

-- CreateTable
CREATE TABLE "outlet_supplier" (
    "outlet_id" TEXT NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "outlet_supplier_pkey" PRIMARY KEY ("outlet_id","supplier_id")
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
CREATE TABLE "saved_order" (
    "saved_order_id" SERIAL NOT NULL,
    "order_id" TEXT,
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
CREATE UNIQUE INDEX "open_close_user_id_company_id_branch_id_outlet_id_start_tim_key" ON "open_close"("user_id", "company_id", "branch_id", "outlet_id", "start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "tax_tax_name_key" ON "tax"("tax_name");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_product_id_outlet_id_key" ON "inventory"("product_id", "outlet_id");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_supplier_id_key" ON "supplier"("supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_email_key" ON "supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "driver_partner_partner_name_key" ON "driver_partner"("partner_name");

-- CreateIndex
CREATE UNIQUE INDEX "driver_partner_outlet_id_partner_name_key" ON "driver_partner"("outlet_id", "partner_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_product_name_key" ON "product"("product_name");

-- CreateIndex
CREATE UNIQUE INDEX "order_product_order_id_product_id_key" ON "order_product"("order_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_receipt_number_key" ON "order"("receipt_number");

-- CreateIndex
CREATE UNIQUE INDEX "product_promo_product_id_promo_id_key" ON "product_promo"("product_id", "promo_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_tax_product_id_tax_id_key" ON "product_tax"("product_id", "tax_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outlet" ADD CONSTRAINT "outlet_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outlet" ADD CONSTRAINT "outlet_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close" ADD CONSTRAINT "open_close_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close" ADD CONSTRAINT "open_close_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close" ADD CONSTRAINT "open_close_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_close" ADD CONSTRAINT "open_close_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax" ADD CONSTRAINT "tax_supplier_supplier_id_fkey" FOREIGN KEY ("supplier_supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_partner" ADD CONSTRAINT "driver_partner_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("product_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_saved_order_id_fkey" FOREIGN KEY ("saved_order_id") REFERENCES "saved_order"("saved_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_driver_partner_fkey" FOREIGN KEY ("driver_partner") REFERENCES "driver_partner"("partner_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_promo" ADD CONSTRAINT "product_promo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_promo" ADD CONSTRAINT "product_promo_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "promo"("promo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tax" ADD CONSTRAINT "product_tax_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tax" ADD CONSTRAINT "product_tax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_partner_outlet" ADD CONSTRAINT "driver_partner_outlet_driver_partner_id_fkey" FOREIGN KEY ("driver_partner_id") REFERENCES "driver_partner"("driver_partner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_partner_outlet" ADD CONSTRAINT "driver_partner_outlet_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outlet_supplier" ADD CONSTRAINT "outlet_supplier_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outlet_supplier" ADD CONSTRAINT "outlet_supplier_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_supplier" ADD CONSTRAINT "inventory_supplier_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("inventory_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_supplier" ADD CONSTRAINT "inventory_supplier_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_tax" ADD CONSTRAINT "supplier_tax_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_tax" ADD CONSTRAINT "supplier_tax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_order" ADD CONSTRAINT "saved_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE SET NULL ON UPDATE CASCADE;
