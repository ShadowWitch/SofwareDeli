/*
  Warnings:

  - You are about to drop the column `custom_discount` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "saleId" TEXT;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "custom_discount",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
