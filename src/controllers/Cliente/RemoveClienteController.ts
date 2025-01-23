import { Request, Response } from 'express';
import { RemoveClienteService } from '../../services/Cliente/RemoveClienteService';


class RemoveClienteController {
    async handle(req: Request, res: Response) {
      const { id } = req.params;
      console.log("ID recebido no controlador:", id); // Log do ID recebido
  
      const removeClienteService = new RemoveClienteService();
  
      try {
        const cliente = await removeClienteService.execute({ Client_id: id });
        
        return res.json(cliente);
      } catch (error) {
        //console.error("Erro ao excluir o cliente:", error.message); // Log do erro
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
    }
  }

export{RemoveClienteController}
