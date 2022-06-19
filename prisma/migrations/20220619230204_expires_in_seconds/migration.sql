/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `ShortLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShortLink" DROP COLUMN "expiresAt",
ADD COLUMN     "expiresIn" INTEGER;
