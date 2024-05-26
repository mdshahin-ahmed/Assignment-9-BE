/*
  Warnings:

  - You are about to drop the column `donarId` on the `requests` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[donorId]` on the table `requests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `donorId` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_donarId_fkey";

-- DropIndex
DROP INDEX "requests_donarId_key";

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "donarId",
ADD COLUMN     "donorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "requests_donorId_key" ON "requests"("donorId");

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
