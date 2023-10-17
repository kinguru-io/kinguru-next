-- AlterTable
ALTER TABLE "User" ADD COLUMN     "telegram" TEXT;

-- CreateTable
CREATE TABLE "SpeakerFollower" (
    "id" TEXT NOT NULL,
    "speakerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeakerFollower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpeakerFollower" ADD CONSTRAINT "SpeakerFollower_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeakerFollower" ADD CONSTRAINT "SpeakerFollower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
