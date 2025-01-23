import { Request, response, Response } from "express";
import { CreateClientService } from "../../services/Cliente/CreateClientService";


class CreateClientController{

async handle(req: Request, res: Response){

const {name, email, status_email, numero_maquina,fiscal,sistem,type,obs } = req.body;

const createClientService = new CreateClientService();

const client = await createClientService.execute({name, email, status_email, numero_maquina,fiscal,sistem,type,obs});

return res.json({client})

}

}

export {CreateClientController}