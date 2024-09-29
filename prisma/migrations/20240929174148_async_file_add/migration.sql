/*
  Warnings:

  - Made the column `midiResultId` on table `Chord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `MidiResult` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `WavResult` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chord" ALTER COLUMN "midiResultId" SET NOT NULL;

-- AlterTable
ALTER TABLE "MidiResult" ALTER COLUMN "classifiedComposer" DROP NOT NULL,
ALTER COLUMN "classifiedGenre" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "WavResult" ALTER COLUMN "classifiedComposer" DROP NOT NULL,
ALTER COLUMN "classifiedGenre" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;
