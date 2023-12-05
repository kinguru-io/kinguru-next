-- CreateEnum
CREATE TYPE "ModerationNotificationStatus" AS ENUM ('sent', 'passed', 'failed');

-- CreateTable
CREATE TABLE "PurchaseNotification" (
    "id" TEXT NOT NULL,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "intentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModerationNotification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "status" "ModerationNotificationStatus" NOT NULL DEFAULT 'sent',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModerationNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseNotification" ADD CONSTRAINT "PurchaseNotification_intentId_fkey" FOREIGN KEY ("intentId") REFERENCES "TicketIntent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationNotification" ADD CONSTRAINT "ModerationNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationNotification" ADD CONSTRAINT "ModerationNotification_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
