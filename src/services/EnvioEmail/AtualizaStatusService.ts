import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateStatus = async (id: string) => {
  try {
    // Verifica se o cliente existe
    const ClienteExistente = await prisma.client.findUnique({
      where: { id },
    });

    if (!ClienteExistente) {
      throw new Error("Cliente não encontrado");
    }

    // Atualiza o status para true apenas se for false
    if (!ClienteExistente.status_email) {
      const ClienteAtualizado = await prisma.client.update({
        where: { id },
        data: { status_email: true },
      });

      return ClienteAtualizado;
    }

    // Retorna o cliente existente sem alterações, já que o status é true
    return ClienteExistente;
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao atualizar o status do cliente");
  }
};
