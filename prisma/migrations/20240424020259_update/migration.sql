/*
  Warnings:

  - A unique constraint covering the columns `[requesterId]` on the table `requests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "requests_requesterId_key" ON "requests"("requesterId");
