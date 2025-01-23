import prismaClient from "../../prisma";

interface ClienteRequest {
  Client_id: string;
}

class RemoveClienteService {
  async execute({ Client_id }: ClienteRequest) {
    // Verifica se o produto existe antes de tentar excluí-lo
    const cliente = await prismaClient.client.findUnique({
      where: {
        id: Client_id,
      },
    });

    if (!cliente) {
      throw new Error("Produto não encontrado");
    }

    // Se o produto existir, prossegue com a exclusão
    return await prismaClient.client.delete({
      where: {
        id: Client_id,
      },
    });
  }
}

export { RemoveClienteService };