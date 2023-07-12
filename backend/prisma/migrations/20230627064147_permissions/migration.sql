/*
  Warnings:

  - You are about to drop the column `delete` on the `UserRolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `UserRolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `update` on the `UserRolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `write` on the `UserRolePermission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `UserRolePermission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key_group]` on the table `UserRolePermission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `UserRolePermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key_group` to the `UserRolePermission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "categories_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "companies_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "discounts_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inventories_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "invoices_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "items_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logs_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "menus_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orders_items_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orders_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "payments_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "providers_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "purchases_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sales_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "taxes_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "transactions_permission" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserRolePermission" DROP COLUMN "delete",
DROP COLUMN "read",
DROP COLUMN "update",
DROP COLUMN "write",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "key_group" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserRolePermission_key_key" ON "UserRolePermission"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UserRolePermission_key_group_key" ON "UserRolePermission"("key_group");
