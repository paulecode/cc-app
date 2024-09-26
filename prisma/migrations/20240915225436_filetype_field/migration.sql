/*
  Warnings:

  - Added the required column `filetype` to the `ClassificationResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClassificationResult" DROP CONSTRAINT "ClassificationResult_userId_fkey";

-- AlterTable
ALTER TABLE "ClassificationResult" ADD COLUMN     "filetype" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ClassificationResult" ADD CONSTRAINT "ClassificationResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
