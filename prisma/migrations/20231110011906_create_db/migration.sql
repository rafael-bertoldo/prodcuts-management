-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "registerNumber" INTEGER NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "codebar" VARCHAR(20) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    "unityPrice" DECIMAL(65,30) NOT NULL,
    "validity" TIMESTAMP(3) NOT NULL,
    "lot" VARCHAR(50) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_product_sup" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "orderSupId" TEXT NOT NULL,

    CONSTRAINT "order_product_sup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_sup" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "supplierId" TEXT NOT NULL,

    CONSTRAINT "order_sup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "partnerSince" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_product_dist" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "orderDistId" TEXT NOT NULL,

    CONSTRAINT "order_product_dist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_dist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "distributorId" TEXT NOT NULL,

    CONSTRAINT "order_dist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distributors" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "partnerSince" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "distributors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_registerNumber_key" ON "users"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_codebar_key" ON "products"("codebar");

-- CreateIndex
CREATE UNIQUE INDEX "order_product_sup_id_key" ON "order_product_sup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_sup_id_key" ON "order_sup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_id_key" ON "suppliers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_name_key" ON "suppliers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "order_product_dist_id_key" ON "order_product_dist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_dist_id_key" ON "order_dist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "distributors_id_key" ON "distributors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "distributors_name_key" ON "distributors"("name");

-- AddForeignKey
ALTER TABLE "order_product_sup" ADD CONSTRAINT "order_product_sup_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product_sup" ADD CONSTRAINT "order_product_sup_orderSupId_fkey" FOREIGN KEY ("orderSupId") REFERENCES "order_sup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_sup" ADD CONSTRAINT "order_sup_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product_dist" ADD CONSTRAINT "order_product_dist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product_dist" ADD CONSTRAINT "order_product_dist_orderDistId_fkey" FOREIGN KEY ("orderDistId") REFERENCES "order_dist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_dist" ADD CONSTRAINT "order_dist_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "distributors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
