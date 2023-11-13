/*
  Warnings:

  - You are about to alter the column `value` on the `order_dist` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `value` on the `order_sup` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `lot` on the `products` table. All the data in the column will be lost.
  - Added the required column `batch` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_dist" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "order_sup" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "lot",
ADD COLUMN     "batch" VARCHAR(50) NOT NULL;
