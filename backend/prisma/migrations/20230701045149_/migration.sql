/*
  Warnings:

  - You are about to drop the column `saleId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `provider_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `provider_id` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `discount_id` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `tax_id` on the `Sale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_saleId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_tax_id_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "saleId",
ADD COLUMN     "provider_id" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "provider_id",
ADD COLUMN     "discount_id" TEXT,
ADD COLUMN     "tax_id" TEXT;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "order_id",
DROP COLUMN "provider_id",
ADD COLUMN     "invoice_id" TEXT;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "customer_id",
DROP COLUMN "discount_id",
DROP COLUMN "tax_id";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
