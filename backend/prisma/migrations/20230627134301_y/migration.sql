/*
  Warnings:

  - You are about to drop the column `user_id` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_user_id_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "user_id",
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "sku" TEXT,
ALTER COLUMN "category_id" DROP NOT NULL,
ALTER COLUMN "inventory_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
