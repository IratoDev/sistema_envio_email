/*
  Warnings:

  - You are about to drop the `Sistem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sistem" DROP CONSTRAINT "Sistem_clientes_id_fkey";

-- DropTable
DROP TABLE "Sistem";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "status_email" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'novo',
    "numero_maquina" DECIMAL(65,30) NOT NULL,
    "fiscal" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "sistem_id" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sistem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sistem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_sistem_id_fkey" FOREIGN KEY ("sistem_id") REFERENCES "sistem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
