/*
  Warnings:

  - You are about to drop the column `updateat` on the `ItemModifierOption` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `ItemModifierOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemModifierOption" DROP COLUMN "updateat",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
