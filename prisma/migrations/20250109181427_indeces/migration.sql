-- CreateIndex
CREATE INDEX "Chord_midiResultId_idx" ON "Chord"("midiResultId");

-- CreateIndex
CREATE INDEX "MidiResult_userId_idx" ON "MidiResult"("userId");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "WavResult_userId_idx" ON "WavResult"("userId");
