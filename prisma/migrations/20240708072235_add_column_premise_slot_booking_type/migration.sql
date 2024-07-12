-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('blocked_by_admin', 'via_website');

-- AlterTable
ALTER TABLE "PremiseSlot" ADD COLUMN     "type" "BookingType" NOT NULL DEFAULT 'via_website';
