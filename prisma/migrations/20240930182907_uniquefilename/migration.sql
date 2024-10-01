/*
  Warnings:

  - A unique constraint covering the columns `[userId,filename]` on the table `MidiResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,filename]` on the table `WavResult` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MidiResult_filename_key";

-- DropIndex
DROP INDEX "WavResult_filename_key";

-- CreateIndex
CREATE UNIQUE INDEX "MidiResult_userId_filename_key" ON "MidiResult"("userId", "filename");

-- CreateIndex
CREATE UNIQUE INDEX "WavResult_userId_filename_key" ON "WavResult"("userId", "filename");
