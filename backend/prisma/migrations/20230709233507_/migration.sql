-- DropForeignKey
ALTER TABLE "ItemModifierOption" DROP CONSTRAINT "ItemModifierOption_item_modifier_id_fkey";

-- AddForeignKey
ALTER TABLE "ItemModifierOption" ADD CONSTRAINT "ItemModifierOption_item_modifier_id_fkey" FOREIGN KEY ("item_modifier_id") REFERENCES "ItemModifier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
