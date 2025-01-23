import { Request, Response } from "express";
import { EnvioEmailService } from "../../services/EnvioEmail/EnvioEmailService";

class EnvioEmailController {
  async handle(req: Request, res: Response) {
  const { nome, arquivoPath, email } = req.body;

  console.log('Dados recebidos:', { nome, arquivoPath, email });

  const envioEmailService = new EnvioEmailService();

  try {
    const envio = await envioEmailService.execute({ nome, arquivoPath, email });
    return res.json(envio);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
}

}

export { EnvioEmailController };
