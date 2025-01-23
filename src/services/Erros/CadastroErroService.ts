import prismaClient from "../../prisma";

interface ErroRequest {
  nome: string;
  causa?: string; // Causa é opcional
  solucao?: string; // Solução é opcional
  imagem?: string; // Imagem do erro
}

class CreateErroService {
  async execute({ nome, causa, solucao, imagem }: ErroRequest) {
    try {
      // Cria um erro no banco de dados
      const erro = await prismaClient.erros.create({
        data: {
          nome,
          causa,
          solucao,
          imagem: imagem || null,
        },
      });

      return erro;
    } catch (err) {
      throw new Error("Erro ao cadastrar erro: " );
    }
  }
}

export { CreateErroService };
