-- AlterTable
ALTER TABLE "ClassificationResult" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "ClassificationResult" ADD CONSTRAINT "ClassificationResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
