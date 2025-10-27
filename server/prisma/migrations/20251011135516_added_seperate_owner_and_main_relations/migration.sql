/*
  Warnings:

  - Made the column `userId` on table `Directory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Directory" DROP CONSTRAINT "Directory_userId_fkey";

-- AlterTable
ALTER TABLE "Directory" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
