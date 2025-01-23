import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateErro = async (
  id: string,
  dados: {
    imagem?:string;
    nome?:string;
    causa?:string;
    solucao?:string;
  }
) => {
  try {
    // Verifica se o cliente existe
    const erroExistente = await prisma.erros.findUnique({
      where: { id },
    });

    if (!erroExistente) {
      throw new Error("erro não encontrado");
    }

    // Atualiza os dados do cliente
    const erroAtualizado = await prisma.erros.update({
      where: { id },
      data: {...dados},
    });

    return erroAtualizado;
  } catch (err) {
    console.error("Erro ao atualizar erro:", err);
    throw new Error("Erro ao atualizar o erro");
  } finally {
    // Fecha a conexão com o banco
    await prisma.$disconnect();
  }
};
