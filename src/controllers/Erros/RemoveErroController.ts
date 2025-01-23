import { Request, Response } from 'express';
import { RemoveErroService } from '../../services/Erros/RemoveErroService';


class RemoveErroController {
    async handle(req: Request, res: Response) {
      const { id } = req.params;
      console.log("ID recebido no controlador:", id); // Log do ID recebido
  
      const removeErroService = new RemoveErroService();
  
      try {
        const erro = await removeErroService.execute({ Erro_id: id });
        
        return res.json(erro);
      } catch (error) {
        
        return res.status(404).json({ error: 'Erro não encontrado' });
      }
    }
  }

export{RemoveErroController}
