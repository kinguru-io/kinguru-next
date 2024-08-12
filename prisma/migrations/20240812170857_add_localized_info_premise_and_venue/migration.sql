-- AlterTable
ALTER TABLE "Premise" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- CreateTable
CREATE TABLE "VenueInformation" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "VenueInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PremiseInformation" (
    "id" TEXT NOT NULL,
    "premiseId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PremiseInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VenueInformation_locale_key" ON "VenueInformation"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "PremiseInformation_locale_key" ON "PremiseInformation"("locale");

-- AddForeignKey
ALTER TABLE "VenueInformation" ADD CONSTRAINT "VenueInformation_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiseInformation" ADD CONSTRAINT "PremiseInformation_premiseId_fkey" FOREIGN KEY ("premiseId") REFERENCES "Premise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
