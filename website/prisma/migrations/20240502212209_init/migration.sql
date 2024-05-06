/*
  Warnings:

  - You are about to drop the `_checkedIn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_checkedIn" DROP CONSTRAINT "_checkedIn_A_fkey";

-- DropForeignKey
ALTER TABLE "_checkedIn" DROP CONSTRAINT "_checkedIn_B_fkey";

-- AlterTable
ALTER TABLE "Association" ALTER COLUMN "association_id" SET DEFAULT concat('ast_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "CheckIn" ALTER COLUMN "checkin_id" SET DEFAULT concat('evt_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- DropTable
DROP TABLE "_checkedIn";

-- CreateTable
CREATE TABLE "CheckInEntry" (
    "checkinentry_id" TEXT NOT NULL DEFAULT concat('cie_', replace(cast(gen_random_uuid() as text), '-', '')),
    "user_id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkin_id" TEXT NOT NULL,

    CONSTRAINT "CheckInEntry_pkey" PRIMARY KEY ("checkinentry_id")
);

-- AddForeignKey
ALTER TABLE "CheckInEntry" ADD CONSTRAINT "CheckInEntry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckInEntry" ADD CONSTRAINT "CheckInEntry_checkin_id_fkey" FOREIGN KEY ("checkin_id") REFERENCES "CheckIn"("checkin_id") ON DELETE RESTRICT ON UPDATE CASCADE;
