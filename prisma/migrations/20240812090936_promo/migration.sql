-- CreateTable
CREATE TABLE "ProductPromo" (
    "product_promo_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "promo_id" INTEGER NOT NULL,

    CONSTRAINT "ProductPromo_pkey" PRIMARY KEY ("product_promo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductPromo_product_id_promo_id_key" ON "ProductPromo"("product_id", "promo_id");

-- AddForeignKey
ALTER TABLE "ProductPromo" ADD CONSTRAINT "ProductPromo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPromo" ADD CONSTRAINT "ProductPromo_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promo"("promo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
