import { Request, Response } from "express";
import { CreateErroService } from "../../services/Erros/CadastroErroService";

class CreateErroController {
  async handle(req: Request, res: Response) {
    const { nome, causa, solucao } = req.body;

    // Criação do serviço de cadastro de erro
    const createErroService = new CreateErroService();

    try {
      // Verifica se foi feito upload de arquivo (imagem do erro)
      if (!req.file) {
        throw new Error("Erro: Arquivo não enviado.");
      }

      const { originalname, filename: imagem } = req.file;

      // Chama o serviço para criar o erro
      const erro = await createErroService.execute({
        nome,
        causa,
        solucao,
        imagem,
      });

      // Retorna o erro criado com sucesso
      return res.json(erro);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { CreateErroController };
