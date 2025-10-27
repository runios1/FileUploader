/*
  Warnings:

  - Made the column `path` on table `Directory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Directory" ALTER COLUMN "path" SET NOT NULL,
ALTER COLUMN "path" SET DEFAULT '.';
