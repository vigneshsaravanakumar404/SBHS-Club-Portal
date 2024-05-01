/*
  Warnings:

  - You are about to drop the column `expires` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the `_CheckInToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CheckInToUser" DROP CONSTRAINT "_CheckInToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CheckInToUser" DROP CONSTRAINT "_CheckInToUser_B_fkey";

-- AlterTable
ALTER TABLE "Association" ALTER COLUMN "association_id" SET DEFAULT concat('ast_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "CheckIn" DROP COLUMN "expires",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "owner_id" TEXT NOT NULL DEFAULT 'fas',
ALTER COLUMN "checkin_id" SET DEFAULT concat('evt_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- DropTable
DROP TABLE "_CheckInToUser";

-- CreateTable
CREATE TABLE "_sharedWith" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_checkedIn" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_sharedWith_AB_unique" ON "_sharedWith"("A", "B");

-- CreateIndex
CREATE INDEX "_sharedWith_B_index" ON "_sharedWith"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_checkedIn_AB_unique" ON "_checkedIn"("A", "B");

-- CreateIndex
CREATE INDEX "_checkedIn_B_index" ON "_checkedIn"("B");

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sharedWith" ADD CONSTRAINT "_sharedWith_A_fkey" FOREIGN KEY ("A") REFERENCES "CheckIn"("checkin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sharedWith" ADD CONSTRAINT "_sharedWith_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_checkedIn" ADD CONSTRAINT "_checkedIn_A_fkey" FOREIGN KEY ("A") REFERENCES "CheckIn"("checkin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_checkedIn" ADD CONSTRAINT "_checkedIn_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
