-- CreateTable
CREATE TABLE "UserLikedEvents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "UserLikedEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLikedEvents_id_key" ON "UserLikedEvents"("id");

-- AddForeignKey
ALTER TABLE "UserLikedEvents" ADD CONSTRAINT "UserLikedEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikedEvents" ADD CONSTRAINT "UserLikedEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
