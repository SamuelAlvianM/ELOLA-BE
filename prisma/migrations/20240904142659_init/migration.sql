-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'OWNER', 'STAFF');

-- CreateEnum
CREATE TYPE "Tax_type" AS ENUM ('Service', 'VAT');

-- CreateEnum
CREATE TYPE "Payment_type" AS ENUM ('Transfer', 'EPayment', 'Cash');

-- CreateEnum
CREATE TYPE "Order_type" AS ENUM ('Order', 'TakeAway');

-- CreateEnum
CREATE TYPE "Order_payment_type" AS ENUM ('Cash', 'Bank_Transfer', 'E-Payment');

-- CreateEnum
CREATE TYPE "Promo_type" AS ENUM ('Discount', 'Sales');

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "super_admin_id" SERIAL NOT NULL,
    "admin_name" TEXT NOT NULL,
    "admin_email" TEXT NOT NULL,
    "admin_pin" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "password" TEXT NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("super_admin_id")
);

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
    "role" "Role" NOT NULL,

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
    "open_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "open_by" INTEGER,
    "close_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "close_by" INTEGER,
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
    "supplierSupplier_id" INTEGER,

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
    "product_code" INTEGER NOT NULL,
    "product_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
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
    "phone_number" TEXT NOT NULL,
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
    "store_id" INTEGER,
    "payment_name" TEXT NOT NULL,
    "payment_type" "Payment_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transaction_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,
    "order_type" "Order_type" NOT NULL,
    "driver_partner" TEXT,
    "receipt_number" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sub_total" DOUBLE PRECISION NOT NULL,
    "grand_total" DOUBLE PRECISION NOT NULL,
    "payment_type" "Order_payment_type" NOT NULL,
    "change" INTEGER NOT NULL,
    "customer_name" TEXT NOT NULL,
    "whatsapp_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "Promo" (
    "promo_id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "promo_type" "Promo_type" NOT NULL,
    "promo_value" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "promo_name" TEXT NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("promo_id")
);

-- CreateTable
CREATE TABLE "ProductPromo" (
    "product_id" INTEGER NOT NULL,
    "promo_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "ProductPromo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTax" (
    "product_id" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,
    "product_tax_id" SERIAL NOT NULL,

    CONSTRAINT "ProductTax_pkey" PRIMARY KEY ("product_tax_id")
);

-- CreateTable
CREATE TABLE "DriverPartnerStore" (
    "driver_partner_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "DriverPartnerStore_pkey" PRIMARY KEY ("driver_partner_id","store_id")
);

-- CreateTable
CREATE TABLE "StoreSupplier" (
    "store_id" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "StoreSupplier_pkey" PRIMARY KEY ("store_id","supplier_id")
);

-- CreateTable
CREATE TABLE "InventorySupplier" (
    "inventory_id" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "InventorySupplier_pkey" PRIMARY KEY ("inventory_id","supplier_id")
);

-- CreateTable
CREATE TABLE "SupplierTax" (
    "supplier_id" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,

    CONSTRAINT "SupplierTax_pkey" PRIMARY KEY ("supplier_id","tax_id")
);

-- CreateTable
CREATE TABLE "StoreStaff" (
    "store_staff_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "StoreStaff_pkey" PRIMARY KEY ("store_staff_id")
);

-- CreateTable
CREATE TABLE "SavedOrder" (
    "saved_order_id" SERIAL NOT NULL,
    "transaction_id" INTEGER,
    "is_done" BOOLEAN DEFAULT false,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "SavedOrder_pkey" PRIMARY KEY ("saved_order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_admin_email_key" ON "SuperAdmin"("admin_email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_admin_pin_key" ON "SuperAdmin"("admin_pin");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_password_key" ON "SuperAdmin"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_pin_key" ON "User"("pin");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_name_key" ON "Store"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_address_key" ON "Store"("store_address");

-- CreateIndex
CREATE UNIQUE INDEX "OpenClose_user_id_store_id_open_date_close_date_key" ON "OpenClose"("user_id", "store_id", "open_date", "close_date");

-- CreateIndex
CREATE UNIQUE INDEX "Tax_tax_name_key" ON "Tax"("tax_name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_name_key" ON "Product"("product_name");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_product_id_store_id_key" ON "Inventory"("product_id", "store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_supplier_id_key" ON "Supplier"("supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DriverPartner_partner_name_key" ON "DriverPartner"("partner_name");

-- CreateIndex
CREATE UNIQUE INDEX "DriverPartner_store_id_partner_name_key" ON "DriverPartner"("store_id", "partner_name");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_receipt_number_key" ON "Transaction"("receipt_number");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_store_id_user_id_driver_partner_key" ON "Transaction"("store_id", "user_id", "driver_partner");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPromo_product_id_promo_id_key" ON "ProductPromo"("product_id", "promo_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTax_product_id_tax_id_key" ON "ProductTax"("product_id", "tax_id");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenClose" ADD CONSTRAINT "OpenClose_close_by_fkey" FOREIGN KEY ("close_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenClose" ADD CONSTRAINT "OpenClose_open_by_fkey" FOREIGN KEY ("open_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenClose" ADD CONSTRAINT "OpenClose_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_supplierSupplier_id_fkey" FOREIGN KEY ("supplierSupplier_id") REFERENCES "Supplier"("supplier_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverPartner" ADD CONSTRAINT "DriverPartner_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_driver_partner_fkey" FOREIGN KEY ("driver_partner") REFERENCES "DriverPartner"("partner_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPromo" ADD CONSTRAINT "ProductPromo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPromo" ADD CONSTRAINT "ProductPromo_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promo"("promo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTax" ADD CONSTRAINT "ProductTax_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTax" ADD CONSTRAINT "ProductTax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverPartnerStore" ADD CONSTRAINT "DriverPartnerStore_driver_partner_id_fkey" FOREIGN KEY ("driver_partner_id") REFERENCES "DriverPartner"("driver_partner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverPartnerStore" ADD CONSTRAINT "DriverPartnerStore_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSupplier" ADD CONSTRAINT "StoreSupplier_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSupplier" ADD CONSTRAINT "StoreSupplier_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventorySupplier" ADD CONSTRAINT "InventorySupplier_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("inventory_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventorySupplier" ADD CONSTRAINT "InventorySupplier_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierTax" ADD CONSTRAINT "SupplierTax_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierTax" ADD CONSTRAINT "SupplierTax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreStaff" ADD CONSTRAINT "StoreStaff_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreStaff" ADD CONSTRAINT "StoreStaff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedOrder" ADD CONSTRAINT "SavedOrder_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("transaction_id") ON DELETE SET NULL ON UPDATE CASCADE;
