/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DEFAULT', 'TEACHER', 'ADVISOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "AssociationType" AS ENUM ('NONE', 'CLUB', 'SPORT', 'OTHER');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "schoolId" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', '')),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "Association" (
    "association_id" TEXT NOT NULL DEFAULT concat('ast_', replace(cast(gen_random_uuid() as text), '-', '')),
    "name" TEXT NOT NULL,
    "type" "AssociationType" NOT NULL,

    CONSTRAINT "Association_pkey" PRIMARY KEY ("association_id")
);

-- CreateTable
CREATE TABLE "CheckIn" (
    "checkin_id" TEXT NOT NULL DEFAULT concat('evt_', replace(cast(gen_random_uuid() as text), '-', '')),
    "name" TEXT NOT NULL DEFAULT 'A generic event',
    "locationIP" BOOLEAN NOT NULL DEFAULT true,
    "locationGEO" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("checkin_id")
);

-- CreateTable
CREATE TABLE "_advisor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_leadership" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CheckInToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_advisor_AB_unique" ON "_advisor"("A", "B");

-- CreateIndex
CREATE INDEX "_advisor_B_index" ON "_advisor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_leadership_AB_unique" ON "_leadership"("A", "B");

-- CreateIndex
CREATE INDEX "_leadership_B_index" ON "_leadership"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CheckInToUser_AB_unique" ON "_CheckInToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CheckInToUser_B_index" ON "_CheckInToUser"("B");

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_checkin_id_fkey" FOREIGN KEY ("checkin_id") REFERENCES "Association"("association_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_advisor" ADD CONSTRAINT "_advisor_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("association_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_advisor" ADD CONSTRAINT "_advisor_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_leadership" ADD CONSTRAINT "_leadership_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("association_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_leadership" ADD CONSTRAINT "_leadership_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CheckInToUser" ADD CONSTRAINT "_CheckInToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CheckIn"("checkin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CheckInToUser" ADD CONSTRAINT "_CheckInToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
