-- CreateEnum
CREATE TYPE "DayOfTheWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "capacity" INTEGER;

-- CreateTable
CREATE TABLE "PlaceOpeningHours" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "day" "DayOfTheWeek" NOT NULL,
    "openTime" TIMESTAMP(3) NOT NULL,
    "closeTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaceOpeningHours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlaceOpeningHours" ADD CONSTRAINT "PlaceOpeningHours_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
