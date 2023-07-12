/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Job_name_key" ON "Job"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
