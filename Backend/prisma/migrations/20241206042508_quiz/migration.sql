/*
  Warnings:

  - The `uniqueId` column on the `mcqsData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "mcqsData_uniqueId_key";

-- AlterTable
ALTER TABLE "mcqsData" DROP COLUMN "uniqueId",
ADD COLUMN     "uniqueId" SERIAL NOT NULL,
ADD CONSTRAINT "mcqsData_pkey" PRIMARY KEY ("uniqueId");
