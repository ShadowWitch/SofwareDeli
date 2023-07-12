/*
  Warnings:

  - You are about to drop the column `payroll_permission` on the `UserRole` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "payroll_permission",
ADD COLUMN     "payrolls_permission" BOOLEAN NOT NULL DEFAULT false;
