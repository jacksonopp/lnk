-- CreateTable
CREATE TABLE "ShortLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresIn" INTEGER NOT NULL DEFAULT 3600,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);
