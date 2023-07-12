/*
  Warnings:

  - The values [CREDIT_CARD,DEBIT_CARD,CHECK] on the enum `PaymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentType_new" AS ENUM ('CASH', 'CARD', 'TRANSFER', 'OTHER');
ALTER TABLE "Sale" ALTER COLUMN "payment_method" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "type" TYPE "PaymentType_new" USING ("type"::text::"PaymentType_new");
ALTER TABLE "Sale" ALTER COLUMN "payment_method" TYPE "PaymentType_new" USING ("payment_method"::text::"PaymentType_new");
ALTER TYPE "PaymentType" RENAME TO "PaymentType_old";
ALTER TYPE "PaymentType_new" RENAME TO "PaymentType";
DROP TYPE "PaymentType_old";
ALTER TABLE "Sale" ALTER COLUMN "payment_method" SET DEFAULT 'CASH';
COMMIT;
