/*
  Warnings:

  - Made the column `expiresIn` on table `ShortLink` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ShortLink" ALTER COLUMN "expiresIn" SET NOT NULL,
ALTER COLUMN "expiresIn" SET DEFAULT 3600;
