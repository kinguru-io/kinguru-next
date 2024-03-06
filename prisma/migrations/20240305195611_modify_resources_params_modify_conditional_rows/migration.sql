/*
  Warnings:

  - Made the column `image` on table `Venue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationMapboxId` on table `Venue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrganizationResourse" ALTER COLUMN "height" SET DEFAULT 720,
ALTER COLUMN "width" SET DEFAULT 405;

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "locationMapboxId" SET NOT NULL;
