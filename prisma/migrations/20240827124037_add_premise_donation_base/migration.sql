-- CreateEnum
CREATE TYPE "PremisePriceMode" AS ENUM ('arbitrary', 'donation');

-- AlterTable
ALTER TABLE "Premise" ADD COLUMN     "minimalPrice" DOUBLE PRECISION,
ADD COLUMN     "priceMode" "PremisePriceMode" NOT NULL DEFAULT 'arbitrary';
