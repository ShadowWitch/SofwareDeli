/*
  Warnings:

  - The values [CONTRACTOR] on the enum `EmployeeContractType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `discount` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `discount_id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `discount_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tax_id` on the `Order` table. All the data in the column will be lost.
  - Made the column `job_id` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company_id` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmployeeContractType_new" AS ENUM ('FULL_TIME', 'PART_TIME', 'TEMPORARY', 'INTERNSHIP', 'VOLUNTEER', 'OTHER');
ALTER TABLE "Employee" ALTER COLUMN "contract_type" DROP DEFAULT;
ALTER TABLE "Employee" ALTER COLUMN "contract_type" TYPE "EmployeeContractType_new" USING ("contract_type"::text::"EmployeeContractType_new");
ALTER TYPE "EmployeeContractType" RENAME TO "EmployeeContractType_old";
ALTER TYPE "EmployeeContractType_new" RENAME TO "EmployeeContractType";
DROP TYPE "EmployeeContractType_old";
ALTER TABLE "Employee" ALTER COLUMN "contract_type" SET DEFAULT 'FULL_TIME';
COMMIT;

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_tax_id_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "job_id" SET NOT NULL,
ALTER COLUMN "company_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "discount",
DROP COLUMN "discount_id";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "image",
ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discount_id",
DROP COLUMN "tax_id";

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "discount_id" TEXT,
ADD COLUMN     "tax_id" TEXT;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
