-- CreateTable
CREATE TABLE "PremiseDiscount" (
    "id" TEXT NOT NULL,
    "premiseId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PremiseDiscount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PremiseDiscount" ADD CONSTRAINT "PremiseDiscount_premiseId_fkey" FOREIGN KEY ("premiseId") REFERENCES "Premise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
