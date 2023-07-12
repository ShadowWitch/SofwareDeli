/*
  Warnings:

  - You are about to drop the column `contact_id` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_contact_id_fkey";

-- DropIndex
DROP INDEX "Customer_contact_id_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "contact_id",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;
