-- AlterTable
ALTER TABLE "Association" ADD COLUMN     "description" TEXT,
ALTER COLUMN "association_id" SET DEFAULT concat('ast_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "CheckIn" ALTER COLUMN "checkinentry_id" SET DEFAULT concat('cie_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "event_id" SET DEFAULT concat('evt_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "EventLog" ALTER COLUMN "log_id" SET DEFAULT concat('cil_', replace(cast(gen_random_uuid() as text), '-', ''), '_', cast(extract(epoch from now()) as text));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
