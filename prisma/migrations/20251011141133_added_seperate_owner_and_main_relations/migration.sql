/*
  Warnings:

  - The `userId` column on the `Directory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "public"."Directory" DROP CONSTRAINT "Directory_userId_fkey";

-- AlterTable
ALTER TABLE "Directory" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
