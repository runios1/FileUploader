-- AlterTable
ALTER TABLE "Directory" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
