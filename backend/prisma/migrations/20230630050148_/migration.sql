/*
  Warnings:

  - You are about to drop the column `rate` on the `Discount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Discount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'AMOUNT');

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "rate",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "amount_type" "DiscountType" NOT NULL DEFAULT 'PERCENTAGE';

-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "terminal_id" TEXT,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Terminal" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "company_id" TEXT,

    CONSTRAINT "Terminal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Discount_name_key" ON "Discount"("name");

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_terminal_id_fkey" FOREIGN KEY ("terminal_id") REFERENCES "Terminal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Terminal" ADD CONSTRAINT "Terminal_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
