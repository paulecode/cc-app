-- CreateTable
CREATE TABLE "ClassificationResult" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "classifiedComposer" TEXT NOT NULL,
    "classifiedGenre" TEXT NOT NULL,

    CONSTRAINT "ClassificationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chord" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "notes" TEXT[],
    "root" TEXT NOT NULL,
    "classificationResultId" INTEGER,

    CONSTRAINT "Chord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassificationResult_filename_key" ON "ClassificationResult"("filename");

-- AddForeignKey
ALTER TABLE "Chord" ADD CONSTRAINT "Chord_classificationResultId_fkey" FOREIGN KEY ("classificationResultId") REFERENCES "ClassificationResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;
