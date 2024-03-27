/*
  Warnings:

  - Added the required column `slug` to the `Premise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Premise" ADD COLUMN     "slug" TEXT NOT NULL;
