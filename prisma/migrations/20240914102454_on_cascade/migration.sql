-- DropForeignKey
ALTER TABLE "Chord" DROP CONSTRAINT "Chord_classificationResultId_fkey";

-- AddForeignKey
ALTER TABLE "Chord" ADD CONSTRAINT "Chord_classificationResultId_fkey" FOREIGN KEY ("classificationResultId") REFERENCES "ClassificationResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;
