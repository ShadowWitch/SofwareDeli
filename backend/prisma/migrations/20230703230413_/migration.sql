-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "payment_method" "PaymentType" DEFAULT 'CASH';

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
