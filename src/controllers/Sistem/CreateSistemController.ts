import { Request, response, Response } from "express";
import { CreateSistemService } from "../../services/Sistem/CreateSistemService";


class CreateSistemController{

async handle(req: Request, res: Response){

const {name} = req.body;

const createSistemService = new CreateSistemService();

const sistem = await createSistemService.execute({name});

return res.json({sistem})

}

}

export {CreateSistemController}