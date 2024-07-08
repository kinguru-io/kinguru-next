-- Step 1: Add the column with a default value
ALTER TABLE "PremiseSlot" ADD COLUMN "organizationId" TEXT DEFAULT 'default_org_id' NOT NULL;

-- Step 2: Update existing rows with a specific value if necessary
-- Replace 'default_org_id' with the actual organization ID you want for existing rows
UPDATE "PremiseSlot" SET "organizationId" = 'specific_org_id' WHERE "organizationId" = 'default_org_id';

-- Step 3: Remove the default value constraint
ALTER TABLE "PremiseSlot" ALTER COLUMN "organizationId" DROP DEFAULT;

-- Step 4: Create the index
CREATE INDEX "PremiseSlot_organizationId_idx" ON "PremiseSlot"("organizationId");

-- Step 5: Add the foreign key constraint
ALTER TABLE "PremiseSlot" ADD CONSTRAINT "PremiseSlot_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
