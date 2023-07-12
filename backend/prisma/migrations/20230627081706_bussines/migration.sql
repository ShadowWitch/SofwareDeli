/*
  Warnings:

  - You are about to drop the column `company_id` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the `CompanyCai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contact_id]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bussiness_id]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact_id]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bussiness_id` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyCai" DROP CONSTRAINT "CompanyCai_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_company_id_fkey";

-- DropIndex
DROP INDEX "Contact_company_id_key";

-- DropIndex
DROP INDEX "Provider_company_id_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "contact_id" TEXT;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "company_id";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "contract_type" "EmployeeContractType" NOT NULL DEFAULT 'FULL_TIME';

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "company_id";

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "company_id",
ADD COLUMN     "bussiness_id" TEXT NOT NULL,
ADD COLUMN     "contact_id" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "terminals_permission" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "CompanyCai";

-- DropTable
DROP TABLE "File";

-- CreateIndex
CREATE UNIQUE INDEX "Company_contact_id_key" ON "Company"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_bussiness_id_key" ON "Provider"("bussiness_id");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_contact_id_key" ON "Provider"("contact_id");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
