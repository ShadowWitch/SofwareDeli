/*
  Warnings:

  - You are about to drop the column `type` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `saleId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_saleId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "type",
ADD COLUMN     "company_id" TEXT;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "saleId";

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "discount" SET DEFAULT 0.00;

-- DropEnum
DROP TYPE "InventoryType";

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
