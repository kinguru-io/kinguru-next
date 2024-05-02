-- AlterTable
ALTER TABLE "Premise" ADD COLUMN     "capacity" INTEGER,
ADD COLUMN     "floor" TEXT,
ADD COLUMN     "room" TEXT,
ADD COLUMN     "type" TEXT DEFAULT '';
