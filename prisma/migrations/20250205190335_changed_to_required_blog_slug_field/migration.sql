/*
  Warnings:

  - You are about to drop the column `slug` on the `BlogDetail` table. All the data in the column will be lost.
  - Made the column `slug` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "BlogDetail_slug_key";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "BlogDetail" DROP COLUMN "slug";
