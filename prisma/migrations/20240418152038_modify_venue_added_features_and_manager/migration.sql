/*
  Warnings:

  - Added the required column `featureAge` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featureCCTV` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featureParking` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationTutorial` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "featureAge" INTEGER NOT NULL,
ADD COLUMN     "featureCCTV" BOOLEAN NOT NULL,
ADD COLUMN     "featureParking" BOOLEAN NOT NULL,
ADD COLUMN     "locationTutorial" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
