/*
  Warnings:

  - You are about to drop the column `classificationResultId` on the `Chord` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chord" DROP CONSTRAINT "Chord_classificationResultId_fkey";

-- AlterTable
ALTER TABLE "Chord" DROP COLUMN "classificationResultId",
ADD COLUMN     "midiResultId" INTEGER;

-- AddForeignKey
ALTER TABLE "Chord" ADD CONSTRAINT "Chord_midiResultId_fkey" FOREIGN KEY ("midiResultId") REFERENCES "MidiResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;
