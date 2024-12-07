-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mcqsData" (
    "uniqueId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "questions" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "mcqsData_uniqueId_key" ON "mcqsData"("uniqueId");

-- AddForeignKey
ALTER TABLE "mcqsData" ADD CONSTRAINT "mcqsData_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
