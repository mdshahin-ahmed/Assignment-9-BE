-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVATE', 'DEACTIVATE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userStatus" "UserStatus" NOT NULL DEFAULT 'ACTIVATE';
