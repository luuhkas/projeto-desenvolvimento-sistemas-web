-- CreateTable
CREATE TABLE "Email" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "para" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "corpo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'enviado',
    "erro" TEXT,
    "enviadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
