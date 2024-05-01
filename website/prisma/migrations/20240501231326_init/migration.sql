-- DropForeignKey
ALTER TABLE "CheckIn" DROP CONSTRAINT "CheckIn_association_id_fkey";

-- AlterTable
ALTER TABLE "Association" ALTER COLUMN "association_id" SET DEFAULT concat('ast_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "CheckIn" ALTER COLUMN "checkin_id" SET DEFAULT concat('evt_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "association_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_association_id_fkey" FOREIGN KEY ("association_id") REFERENCES "Association"("association_id") ON DELETE SET NULL ON UPDATE CASCADE;
