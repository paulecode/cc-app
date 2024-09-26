/*
  Warnings:

  - You are about to drop the `ClassificationResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chord" DROP CONSTRAINT "Chord_classificationResultId_fkey";

-- DropForeignKey
ALTER TABLE "ClassificationResult" DROP CONSTRAINT "ClassificationResult_userId_fkey";

-- DropTable
DROP TABLE "ClassificationResult";

-- CreateTable
CREATE TABLE "MidiResult" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "classifiedComposer" TEXT NOT NULL,
    "classifiedGenre" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "MidiResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MidiResult_filename_key" ON "MidiResult"("filename");

-- AddForeignKey
ALTER TABLE "MidiResult" ADD CONSTRAINT "MidiResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chord" ADD CONSTRAINT "Chord_classificationResultId_fkey" FOREIGN KEY ("classificationResultId") REFERENCES "MidiResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;
