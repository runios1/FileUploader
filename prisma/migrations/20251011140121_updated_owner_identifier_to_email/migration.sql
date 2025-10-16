/*
  Warnings:

  - You are about to drop the column `userId` on the `Directory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Directory" DROP CONSTRAINT "Directory_userId_fkey";

-- AlterTable
ALTER TABLE "Directory" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
