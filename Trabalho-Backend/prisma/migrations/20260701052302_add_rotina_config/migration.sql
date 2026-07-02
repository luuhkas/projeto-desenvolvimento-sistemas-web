-- CreateTable
CREATE TABLE "RotinaConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cron" TEXT NOT NULL DEFAULT '0 18 * * *',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "atualizadoEm" DATETIME NOT NULL
);
