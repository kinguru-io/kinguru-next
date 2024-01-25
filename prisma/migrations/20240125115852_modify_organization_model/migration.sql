/*
  Warnings:

  - Added the required column `aboutCompany` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foundationDate` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requisitesUrl` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "aboutCompany" TEXT NOT NULL,
ADD COLUMN     "activitySphere" TEXT[],
ADD COLUMN     "foundationDate" DATE NOT NULL,
ADD COLUMN     "logotype" TEXT,
ADD COLUMN     "requisitesUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OrganizationResourse" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationResourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrganizationResourse" ADD CONSTRAINT "OrganizationResourse_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
