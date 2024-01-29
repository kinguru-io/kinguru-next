/*
  Warnings:

  - Added the required column `email` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "password" TEXT NOT NULL;
