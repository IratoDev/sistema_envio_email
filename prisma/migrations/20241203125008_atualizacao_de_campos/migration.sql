/*
  Warnings:

  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - Added the required column `numero_maquina` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusEmail` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "numero_maquina" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "statusEmail" BOOLEAN NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'novo';

-- CreateTable
CREATE TABLE "Sistem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientes_id" TEXT NOT NULL,

    CONSTRAINT "Sistem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sistem" ADD CONSTRAINT "Sistem_clientes_id_fkey" FOREIGN KEY ("clientes_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
