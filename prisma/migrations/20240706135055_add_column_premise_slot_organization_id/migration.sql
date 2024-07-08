/*
  Warnings:

  - Added the required column `organizationId` to the `PremiseSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PremiseSlot" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "PremiseSlot_organizationId_idx" ON "PremiseSlot"("organizationId");

-- AddForeignKey
ALTER TABLE "PremiseSlot" ADD CONSTRAINT "PremiseSlot_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
