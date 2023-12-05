/*
  Warnings:

  - You are about to drop the column `intentId` on the `PurchaseNotification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseNotification" DROP CONSTRAINT "PurchaseNotification_intentId_fkey";

-- AlterTable
ALTER TABLE "PurchaseNotification" DROP COLUMN "intentId",
ADD COLUMN     "eventId" TEXT,
ADD COLUMN     "status" "TicketIntentStatus" NOT NULL DEFAULT 'progress',
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "PurchaseNotification" ADD CONSTRAINT "PurchaseNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseNotification" ADD CONSTRAINT "PurchaseNotification_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
