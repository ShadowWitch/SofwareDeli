-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "jobs_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "payroll_permission" BOOLEAN NOT NULL DEFAULT false;
