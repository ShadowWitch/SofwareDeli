/*
  Warnings:

  - You are about to drop the column `menu_id` on the `Item` table. All the data in the column will be lost.
  - Made the column `inventory_id` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_menu_id_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "menu_id",
ALTER COLUMN "inventory_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "_ItemToMenu" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToMenu_AB_unique" ON "_ItemToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToMenu_B_index" ON "_ItemToMenu"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMenu" ADD CONSTRAINT "_ItemToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMenu" ADD CONSTRAINT "_ItemToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
