-- DropIndex
DROP INDEX "Customer_id_card_key";

-- DropIndex
DROP INDEX "Customer_rtn_key";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "company_id" TEXT,
ALTER COLUMN "birthdate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
