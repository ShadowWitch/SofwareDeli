/*
  Warnings:

  - You are about to drop the column `barcode` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "barcode",
DROP COLUMN "sku";
