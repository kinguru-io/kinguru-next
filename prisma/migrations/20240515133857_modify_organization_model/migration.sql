/*
  Warnings:

  - You are about to drop the column `aboutCompany` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `activitySphere` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `requisitesUrl` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `IBAN` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NIP` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `foundationDate` on the `Organization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BusinessRegion" AS ENUM ('AMER', 'APAC', 'EMEA');

-- CreateEnum
CREATE TYPE "SocialNetwork" AS ENUM ('linkedin', 'instagram', 'facebook', 'threads');

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "aboutCompany",
DROP COLUMN "activitySphere",
DROP COLUMN "requisitesUrl",
ADD COLUMN     "IBAN" TEXT NOT NULL,
ADD COLUMN     "NIP" TEXT NOT NULL,
ADD COLUMN     "bankName" TEXT NOT NULL,
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "businessRegion" "BusinessRegion" DEFAULT 'EMEA',
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
DROP COLUMN "foundationDate",
ADD COLUMN     "foundationDate" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "room" TEXT,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "network" "SocialNetwork" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
