/*
  Warnings:

  - You are about to drop the column `owner_id` on the `CheckIn` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CheckIn" DROP CONSTRAINT "CheckIn_owner_id_fkey";

-- AlterTable
ALTER TABLE "Association" ALTER COLUMN "association_id" SET DEFAULT concat('ast_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "CheckIn" DROP COLUMN "owner_id",
ALTER COLUMN "checkin_id" SET DEFAULT concat('evt_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
