/*
  Warnings:

  - The primary key for the `CheckIn` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `association_id` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `checkin_id` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `locationGEO` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `locationIP` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the `CheckInEntry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `event_id` to the `CheckIn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `CheckIn` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('CREATED', 'ACTIVE', 'SHARE', 'LOCATION', 'CODE', 'OTHER');

-- DropForeignKey
ALTER TABLE "CheckIn" DROP CONSTRAINT "CheckIn_association_id_fkey";

-- DropForeignKey
ALTER TABLE "CheckIn" DROP CONSTRAINT "CheckIn_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "CheckInEntry" DROP CONSTRAINT "CheckInEntry_checkin_id_fkey";

-- DropForeignKey
ALTER TABLE "CheckInEntry" DROP CONSTRAINT "CheckInEntry_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_sharedWith" DROP CONSTRAINT "_sharedWith_A_fkey";

-- DropIndex
DROP INDEX "CheckIn_code_key";

-- AlterTable
ALTER TABLE "Association" ALTER COLUMN "association_id" SET DEFAULT concat('ast_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "CheckIn" DROP CONSTRAINT "CheckIn_pkey",
DROP COLUMN "active",
DROP COLUMN "association_id",
DROP COLUMN "checkin_id",
DROP COLUMN "code",
DROP COLUMN "createdAt",
DROP COLUMN "locationGEO",
DROP COLUMN "locationIP",
DROP COLUMN "name",
DROP COLUMN "owner_id",
ADD COLUMN     "checkinentry_id" TEXT NOT NULL DEFAULT concat('cie_', replace(cast(gen_random_uuid() as text), '-', '')),
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("checkinentry_id");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- DropTable
DROP TABLE "CheckInEntry";

-- CreateTable
CREATE TABLE "EventLog" (
    "log_id" TEXT NOT NULL DEFAULT concat('cil_', replace(cast(gen_random_uuid() as text), '-', ''), '_', cast(extract(epoch from now()) as text)),
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" TEXT NOT NULL,
    "type" "LogType" NOT NULL DEFAULT 'OTHER',
    "description" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" TEXT NOT NULL DEFAULT concat('evt_', replace(cast(gen_random_uuid() as text), '-', '')),
    "name" TEXT NOT NULL DEFAULT 'A generic event',
    "locationIP" BOOLEAN NOT NULL DEFAULT true,
    "locationGEO" BOOLEAN NOT NULL DEFAULT false,
    "association_id" TEXT,
    "code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_code_key" ON "Event"("code");

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_association_id_fkey" FOREIGN KEY ("association_id") REFERENCES "Association"("association_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sharedWith" ADD CONSTRAINT "_sharedWith_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;
