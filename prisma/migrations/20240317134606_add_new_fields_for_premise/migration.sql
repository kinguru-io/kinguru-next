-- AlterTable
ALTER TABLE "Premise" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "bookingCancelTerm" TEXT DEFAULT 'Booking cancel term',
ADD COLUMN     "direction" TEXT DEFAULT 'Direction',
ADD COLUMN     "rules" TEXT DEFAULT 'Rules';
