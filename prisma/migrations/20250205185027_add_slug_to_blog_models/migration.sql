/*
  Warnings:

  - You are about to drop the column `image` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Blog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `BlogDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "image",
DROP COLUMN "updatedAt",
ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "BlogDetail" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogDetail_slug_key" ON "BlogDetail"("slug");
