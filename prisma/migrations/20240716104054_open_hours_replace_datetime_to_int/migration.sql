/*
  Warnings:

  - Changed the type of `openTime` on the `PremiseOpenHours` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `closeTime` on the `PremiseOpenHours` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PremiseOpenHours" DROP COLUMN "openTime",
ADD COLUMN     "openTime" INTEGER NOT NULL,
DROP COLUMN "closeTime",
ADD COLUMN     "closeTime" INTEGER NOT NULL;
