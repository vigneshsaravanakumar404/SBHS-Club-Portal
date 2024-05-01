/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `CheckIn` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Association" ALTER COLUMN "association_id" SET DEFAULT concat('ast_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "CheckIn" ALTER COLUMN "checkin_id" SET DEFAULT concat('evt_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_code_key" ON "CheckIn"("code");
