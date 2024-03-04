/*
  Warnings:

  - You are about to drop the column `placeholder_price` on the `Premise` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Premise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Premise" DROP COLUMN "placeholder_price",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" DROP DEFAULT,
ALTER COLUMN "locationMapboxId" DROP NOT NULL,
ALTER COLUMN "locationMapboxId" DROP DEFAULT,
ALTER COLUMN "slug" DROP DEFAULT;

-- CreateTable
CREATE TABLE "PremiseOpenHours" (
    "id" TEXT NOT NULL,
    "premiseId" TEXT NOT NULL,
    "day" "DayOfTheWeek" NOT NULL,
    "openTime" TIMESTAMP(3) NOT NULL,
    "closeTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PremiseOpenHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PremiseSlot" (
    "id" TEXT NOT NULL,
    "premiseId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PremiseSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PremisePricing" (
    "id" TEXT NOT NULL,
    "premiseOpenHoursId" TEXT NOT NULL,
    "priceForHour" DOUBLE PRECISION NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PremisePricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Venue_slug_key" ON "Venue"("slug");

-- AddForeignKey
ALTER TABLE "PremiseOpenHours" ADD CONSTRAINT "PremiseOpenHours_premiseId_fkey" FOREIGN KEY ("premiseId") REFERENCES "Premise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiseSlot" ADD CONSTRAINT "PremiseSlot_premiseId_fkey" FOREIGN KEY ("premiseId") REFERENCES "Premise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremisePricing" ADD CONSTRAINT "PremisePricing_premiseOpenHoursId_fkey" FOREIGN KEY ("premiseOpenHoursId") REFERENCES "PremiseOpenHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
