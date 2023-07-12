/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Made the column `company_id` on table `Inventory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_company_id_fkey";

-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "company_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_phone_key" ON "Contact"("phone");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
