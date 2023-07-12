/*
  Warnings:

  - You are about to drop the column `description` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "description",
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "notes",
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "description",
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "notes",
ADD COLUMN     "note" TEXT;
