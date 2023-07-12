-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "items_modifiers_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "items_variations_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pos_permission" BOOLEAN NOT NULL DEFAULT false;
