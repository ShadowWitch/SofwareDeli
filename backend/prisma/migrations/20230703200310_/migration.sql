/*
  Warnings:

  - You are about to drop the column `discount` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "discount";

-- CreateTable
CREATE TABLE "_ItemToSale" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToSale_AB_unique" ON "_ItemToSale"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToSale_B_index" ON "_ItemToSale"("B");

-- AddForeignKey
ALTER TABLE "_ItemToSale" ADD CONSTRAINT "_ItemToSale_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToSale" ADD CONSTRAINT "_ItemToSale_B_fkey" FOREIGN KEY ("B") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
