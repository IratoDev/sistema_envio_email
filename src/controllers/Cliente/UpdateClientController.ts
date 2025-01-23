import { Request, Response } from "express";
import { updateClient } from "../../services/Cliente/UpdateClientService";

class UpdateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // ID do cliente passado na URL

    // Dados que serão atualizados no corpo da requisição
    const { 
      name, 
      email, 
      status_email, 
      type, 
      numero_maquina, 
      fiscal, 
      sistem_id, 
      obs 
    } = req.body;

    try {
      // Chama o service para atualizar os dados do cliente no banco
      const clienteAtualizado = await updateClient(id, {
        name,
        email,
        status_email,
        type,
        numero_maquina,
        fiscal,
        sistem_id,
        obs,
      });

      // Retorna erro 404 se o cliente não for encontrado
      if (!clienteAtualizado) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      // Retorna sucesso com o cliente atualizado
      return res.status(200).json({ 
        message: "Cliente atualizado com sucesso", 
        cliente: clienteAtualizado 
      });
    } catch (err) {
      console.error("Erro ao atualizar cliente:");
      return res.status(500).json({ error: "Erro ao atualizar o cliente" });
    }
  }
}

export { UpdateClientController };
