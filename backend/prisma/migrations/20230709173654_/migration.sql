/*
  Warnings:

  - The values [AMOUNT] on the enum `DiscountType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `item_variation_id` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_id` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the `ItemVariation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemToItemVariation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DiscountType_new" AS ENUM ('PERCENTAGE', 'FIXED');
ALTER TABLE "Discount" ALTER COLUMN "amount_type" DROP DEFAULT;
ALTER TABLE "Discount" ALTER COLUMN "amount_type" TYPE "DiscountType_new" USING ("amount_type"::text::"DiscountType_new");
ALTER TYPE "DiscountType" RENAME TO "DiscountType_old";
ALTER TYPE "DiscountType_new" RENAME TO "DiscountType";
DROP TYPE "DiscountType_old";
ALTER TABLE "Discount" ALTER COLUMN "amount_type" SET DEFAULT 'PERCENTAGE';
COMMIT;

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_item_variation_id_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToItemVariation" DROP CONSTRAINT "_ItemToItemVariation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToItemVariation" DROP CONSTRAINT "_ItemToItemVariation_B_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "item_variation_id",
ADD COLUMN     "item_variant_id" TEXT;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "invoice_id";

-- DropTable
DROP TABLE "ItemVariation";

-- DropTable
DROP TABLE "_ItemToItemVariation";

-- DropEnum
DROP TYPE "InvoiceType";

-- CreateTable
CREATE TABLE "ItemVariant" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "options" TEXT[],

    CONSTRAINT "ItemVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceLote" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceLote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToItemVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemVariant_name_key" ON "ItemVariant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToItemVariant_AB_unique" ON "_ItemToItemVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToItemVariant_B_index" ON "_ItemToItemVariant"("B");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_item_variant_id_fkey" FOREIGN KEY ("item_variant_id") REFERENCES "ItemVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToItemVariant" ADD CONSTRAINT "_ItemToItemVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToItemVariant" ADD CONSTRAINT "_ItemToItemVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
