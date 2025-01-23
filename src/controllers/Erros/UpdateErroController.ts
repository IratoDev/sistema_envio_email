import { Request, Response } from "express";
import { updateErro } from "../../services/Erros/UpdateErroService";

class UpdateErroController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // ID do cliente passado na URL

    // Dados que serão atualizados no corpo da requisição
    const { 
      nome,
      causa,
      solucao
    } = req.body;

    let imagem = req.body.imagem; // Se não houver um novo arquivo, manter o banner atual

    if (req.file) {
      // Se a imagem foi enviada, atribui o novo caminho da imagem
      imagem = req.file.filename;
    }

    try {
      // Chama o service para atualizar os dados do cliente no banco
      const erroAtualizado = await updateErro(id, {
        imagem,
        nome,
        causa,
        solucao
      });

      // Retorna erro 404 se o cliente não for encontrado
      if (!erroAtualizado) {
        return res.status(404).json({ error: "Erro não encontrado" });
      }

      // Retorna sucesso com o cliente atualizado
      return res.status(200).json({ 
        message: "erro atualizado com sucesso", 
        erro: erroAtualizado 
      });
    } catch (err) {
      console.error("Erro ao atualizar erro:");
      return res.status(500).json({ error: "Erro ao atualizar o erro" });
    }
  }
}

export { UpdateErroController };
