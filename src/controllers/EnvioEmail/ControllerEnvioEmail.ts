import { Request, Response } from "express";
import { EnvioEmailService } from "../../services/EnvioEmail/EnvioEmailService";

class EnvioEmailController{

async handle(req:Request, res:Response){

const {nome, arquivo} = req.body;

const envioEmailService = new EnvioEmailService();

const envio = await envioEmailService.execute({nome, arquivo})

return res.json(envio);

}

}

export {EnvioEmailController}