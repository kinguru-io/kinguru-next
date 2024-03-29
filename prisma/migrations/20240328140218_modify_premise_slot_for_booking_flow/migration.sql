/*
  Warnings:

  - Added the required column `paymentIntentId` to the `PremiseSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `PremiseSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PremiseSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PremiseSlot" ADD COLUMN     "paymentIntentId" TEXT NOT NULL,
ADD COLUMN     "status" "TicketIntentStatus" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PremiseSlot" ADD CONSTRAINT "PremiseSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
