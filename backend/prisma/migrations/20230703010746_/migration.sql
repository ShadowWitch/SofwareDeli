/*
  Warnings:

  - You are about to drop the column `enabled` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_transaction_id_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "enabled",
ALTER COLUMN "rtn" DROP NOT NULL,
ALTER COLUMN "id_card" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "transaction_id";
