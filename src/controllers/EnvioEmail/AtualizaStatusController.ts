import { Request, Response } from "express";
import { updateStatus } from "../../services/EnvioEmail/AtualizaStatusService";


class AtualizaStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; 
    const { status_email } = req.body;


    try {
      // Chama o service para atualizar os dados no banco
      const produtoAtualizado = await updateStatus(id);

      if (!produtoAtualizado) {
        return res.status(404).json({ error: "cliente não encontrado" });
      }

      return res.status(200).json({ message: "status atualizado com sucesso", produto: produtoAtualizado });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar o status" });
    }
  }
}

export { AtualizaStatusController };
