/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Directory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Directory" DROP CONSTRAINT "Directory_userEmail_fkey";

-- AlterTable
ALTER TABLE "Directory" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
