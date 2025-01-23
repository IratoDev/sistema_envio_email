import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateClient = async (
  id: string,
  dados: {
    name?: string;
    email?: string;
    status_email?: boolean;
    type?: string;
    numero_maquina?: number;
    fiscal?: string;
    sistem_id?: string;
    obs?: string;
    updated_at?: Date;
  }
) => {
  try {
    // Verifica se o cliente existe
    const clienteExistente = await prisma.client.findUnique({
      where: { id },
    });

    if (!clienteExistente) {
      throw new Error("Cliente não encontrado");
    }

    // Atualiza os dados do cliente
    const clienteAtualizado = await prisma.client.update({
      where: { id },
      data: {
        name: dados.name,
        email: dados.email,
        status_email: dados.status_email,
        type: dados.type,
        numero_maquina: dados.numero_maquina,
        fiscal: dados.fiscal,
        sistem_id: dados.sistem_id,
        obs: dados.obs,
        updated_at: new Date(), // Atualiza a data de modificação
      },
    });

    return clienteAtualizado;
  } catch (err) {
    console.error("Erro ao atualizar cliente:", err);
    throw new Error("Erro ao atualizar o cliente");
  } finally {
    // Fecha a conexão com o banco
    await prisma.$disconnect();
  }
};
