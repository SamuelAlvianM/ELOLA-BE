-- CreateTable
CREATE TABLE "ProductTax" (
    "product_id" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,

    CONSTRAINT "ProductTax_pkey" PRIMARY KEY ("product_id","tax_id")
);

-- CreateTable
CREATE TABLE "ProductPackageTax" (
    "productPackage_id" INTEGER NOT NULL,
    "tax_id" INTEGER NOT NULL,

    CONSTRAINT "ProductPackageTax_pkey" PRIMARY KEY ("productPackage_id","tax_id")
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

-- AddForeignKey
ALTER TABLE "ProductTax" ADD CONSTRAINT "ProductTax_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTax" ADD CONSTRAINT "ProductTax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPackageTax" ADD CONSTRAINT "ProductPackageTax_productPackage_id_fkey" FOREIGN KEY ("productPackage_id") REFERENCES "ProductPackage"("productPackage_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPackageTax" ADD CONSTRAINT "ProductPackageTax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax"("tax_id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
