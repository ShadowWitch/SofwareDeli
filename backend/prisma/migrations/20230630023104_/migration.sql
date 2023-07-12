/*
  Warnings:

  - You are about to drop the `CompanyDepartment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyDepartment" DROP CONSTRAINT "CompanyDepartment_company_id_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "saleId" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "code" TEXT NOT NULL;

-- DropTable
DROP TABLE "CompanyDepartment";

-- CreateIndex
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
