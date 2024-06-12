-- CreateTable
CREATE TABLE "UserSocialLink" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "network" "SocialNetwork" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "UserSocialLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSocialLink" ADD CONSTRAINT "UserSocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
