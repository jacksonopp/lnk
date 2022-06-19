-- CreateTable
CREATE TABLE "ShortLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);
