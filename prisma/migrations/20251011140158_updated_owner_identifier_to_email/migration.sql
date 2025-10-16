/*
  Warnings:

  - Made the column `userEmail` on table `Directory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Directory" DROP CONSTRAINT "Directory_userEmail_fkey";

-- AlterTable
ALTER TABLE "Directory" ALTER COLUMN "userEmail" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
