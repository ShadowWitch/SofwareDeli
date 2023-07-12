/*
  Warnings:

  - You are about to drop the column `item_id` on the `ItemModifier` table. All the data in the column will be lost.
  - You are about to drop the column `item_modifier_id` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `item_variant_id` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemModifier" DROP CONSTRAINT "ItemModifier_item_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_item_modifier_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_item_variant_id_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "discount_id" TEXT;

-- AlterTable
ALTER TABLE "ItemModifier" DROP COLUMN "item_id";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "item_modifier_id",
DROP COLUMN "item_variant_id";

-- CreateTable
CREATE TABLE "_ItemToItemModifier" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToItemModifier_AB_unique" ON "_ItemToItemModifier"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToItemModifier_B_index" ON "_ItemToItemModifier"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToItemModifier" ADD CONSTRAINT "_ItemToItemModifier_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToItemModifier" ADD CONSTRAINT "_ItemToItemModifier_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemModifier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
