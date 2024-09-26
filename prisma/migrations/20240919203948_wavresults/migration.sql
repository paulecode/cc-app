-- CreateTable
CREATE TABLE "WavResult" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "classifiedComposer" TEXT NOT NULL,
    "classifiedGenre" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "WavResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WavResult_filename_key" ON "WavResult"("filename");

-- AddForeignKey
ALTER TABLE "WavResult" ADD CONSTRAINT "WavResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
