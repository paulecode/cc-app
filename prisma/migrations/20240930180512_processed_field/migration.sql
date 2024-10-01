-- AlterTable
ALTER TABLE "MidiResult" ADD COLUMN     "processed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WavResult" ADD COLUMN     "processed" BOOLEAN NOT NULL DEFAULT false;
