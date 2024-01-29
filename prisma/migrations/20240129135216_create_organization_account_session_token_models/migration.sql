-- CreateTable
CREATE TABLE "OrganizationAccount" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "type" "ProviderType" NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "OrganizationAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationSession" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationVerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationAccount_id_key" ON "OrganizationAccount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationAccount_provider_providerAccountId_key" ON "OrganizationAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationSession_sessionToken_key" ON "OrganizationSession"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationVerificationToken_token_key" ON "OrganizationVerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationVerificationToken_identifier_token_key" ON "OrganizationVerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "OrganizationAccount" ADD CONSTRAINT "OrganizationAccount_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationSession" ADD CONSTRAINT "OrganizationSession_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
