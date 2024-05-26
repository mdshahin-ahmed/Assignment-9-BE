/*
  Warnings:

  - You are about to drop the column `lastDonationDate` on the `userProfiles` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `userProfiles` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userProfiles" DROP COLUMN "lastDonationDate",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL;
