/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ItemModifier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ItemModifier_name_key" ON "ItemModifier"("name");
