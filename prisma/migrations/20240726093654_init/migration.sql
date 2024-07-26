-- CreateEnum
CREATE TYPE "Tax_type" AS ENUM ('Service', 'VAT');

-- CreateEnum
CREATE TYPE "Payment_type" AS ENUM ('Bank', 'E-Payment');

-- CreateEnum
CREATE TYPE "Order_type" AS ENUM ('Retail', 'Take_away');

-- CreateEnum
CREATE TYPE "Order_payment_type" AS ENUM ('Cash', 'Bank_Transfer', 'E-Payment');

-- CreateEnum
CREATE TYPE "Promo_type" AS ENUM ('Discount', 'Sales');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Store" (
    "store_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "OpenClose" (
    "open_close_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "is_cashier_open" BOOLEAN NOT NULL DEFAULT false,
    "open_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "open_by" INTEGER NOT NULL,
    "close_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "close_by" INTEGER NOT NULL,
    "bill_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "OpenClose_pkey" PRIMARY KEY ("open_close_id")
);

-- CreateTable
CREATE TABLE "Tax" (
    "tax_id" SERIAL NOT NULL,
    "tax_type" "Tax_type" NOT NULL,
    "tax_name" TEXT NOT NULL,
    "tax_value" INTEGER NOT NULL,
    "tax_status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("tax_id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "product_category_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("product_category_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "product_category_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" INTEGER NOT NULL,
    "cost_of_good_sold" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "service" INTEGER NOT NULL,
    "product_code" INTEGER NOT NULL,
    "product_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "ProductPackage" (
    "productPackage_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "package_name" TEXT NOT NULL,
    "package_price" INTEGER NOT NULL,
    "cost_of_good_sold" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "service" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ProductPackage_pkey" PRIMARY KEY ("productPackage_id")
);

-- CreateTable
CREATE TABLE "Inventory" (
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

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventory_id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "supplier_id" SERIAL NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "supplier_product" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "DriverPartner" (
    "driver_partner_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,
    "partner_name" TEXT NOT NULL,
    "benefit" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "DriverPartner_pkey" PRIMARY KEY ("driver_partner_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "payment_name" TEXT NOT NULL,
    "payment_type" "Payment_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transaction_id" TEXT NOT NULL,
    "store_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_type" "Order_type" NOT NULL,
    "driver_partner" TEXT NOT NULL,
    "receipt_number" SERIAL NOT NULL,
    "sub_total" DOUBLE PRECISION NOT NULL,
    "service" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "rounding" INTEGER NOT NULL,
    "grand_total" INTEGER NOT NULL,
    "c_o_g_s" DOUBLE PRECISION NOT NULL,
    "payment_type" "Order_payment_type" NOT NULL,
    "change" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "Promo" (
    "promo_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "promo_type" "Promo_type" NOT NULL,
    "promo_value" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("promo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_name_key" ON "Store"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_address_key" ON "Store"("store_address");

-- CreateIndex
CREATE UNIQUE INDEX "OpenClose_user_id_key" ON "OpenClose"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "OpenClose_user_id_store_id_key" ON "OpenClose"("user_id", "store_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_store_id_key" ON "ProductCategory"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_store_id_product_category_id_key" ON "Product"("store_id", "product_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPackage_product_id_key" ON "ProductPackage"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_product_id_store_id_key" ON "Inventory"("product_id", "store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DriverPartner_partner_name_key" ON "DriverPartner"("partner_name");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_payment_name_key" ON "Payment"("payment_name");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_store_id_key" ON "Payment"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_store_id_user_id_driver_partner_key" ON "Transaction"("store_id", "user_id", "driver_partner");

-- CreateIndex
CREATE UNIQUE INDEX "Promo_product_id_key" ON "Promo"("product_id");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenClose" ADD CONSTRAINT "OpenClose_open_by_fkey" FOREIGN KEY ("open_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenClose" ADD CONSTRAINT "OpenClose_close_by_fkey" FOREIGN KEY ("close_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenClose" ADD CONSTRAINT "OpenClose_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_driver_partner_fkey" FOREIGN KEY ("driver_partner") REFERENCES "DriverPartner"("partner_name") ON DELETE RESTRICT ON UPDATE CASCADE;
