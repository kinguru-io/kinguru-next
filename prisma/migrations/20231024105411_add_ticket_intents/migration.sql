-- CreateEnum
CREATE TYPE "TicketIntentStatus" AS ENUM ('failed', 'progress', 'succeed');

-- CreateTable
CREATE TABLE "TicketIntent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "TicketIntentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketIntent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketIntent" ADD CONSTRAINT "TicketIntent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketIntent" ADD CONSTRAINT "TicketIntent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
