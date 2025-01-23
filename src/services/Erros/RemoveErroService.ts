import prismaClient from "../../prisma";

interface ErroRequest {
  Erro_id: string;
}

class RemoveErroService {
  async execute({ Erro_id }: ErroRequest) {
    // Verifica se o produto existe antes de tentar excluí-lo
    const erros = await prismaClient.erros.findUnique({
      where: {
        id: Erro_id,
      },
    });

    if (!erros) {
      throw new Error("Produto não encontrado");
    }

    // Se o produto existir, prossegue com a exclusão
    return await prismaClient.erros.delete({
      where: {
        id: Erro_id,
      },
    });
  }
}

export { RemoveErroService };