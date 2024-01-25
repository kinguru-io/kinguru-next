/*
  Warnings:

  - Added the required column `aboutCompany` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activitySphere` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foudationDate` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requisites` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "aboutCompany" TEXT NOT NULL,
ADD COLUMN     "activitySphere" TEXT NOT NULL,
ADD COLUMN     "foudationDate" DATE NOT NULL,
ADD COLUMN     "logotype" TEXT,
ADD COLUMN     "requisites" TEXT NOT NULL;
