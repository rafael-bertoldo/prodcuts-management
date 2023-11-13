/*
  Warnings:

  - You are about to drop the column `validity` on the `products` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "validity",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;
