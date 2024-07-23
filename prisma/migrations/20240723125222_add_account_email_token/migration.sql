/*
  Warnings:

  - A unique constraint covering the columns `[emailToken]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "emailToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Account_emailToken_key" ON "Account"("emailToken");
