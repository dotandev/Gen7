-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "longUrl" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" DATETIME
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "urlId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" TEXT NOT NULL,
    "referrer" TEXT,
    "ip" TEXT,
    CONSTRAINT "Visit_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortCode_key" ON "Url"("shortCode");
