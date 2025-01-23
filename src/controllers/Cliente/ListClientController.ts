import { Request, Response } from "express";
import { ListClientService } from "../../services/Cliente/ListClientService";

class ListClientController{

async handle(req:Request, res:Response){

    const listClientService = new ListClientService;

try {

    const cliente = await listClientService.execute();

    return res.json(cliente);

} catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return res.status(500).json({ error: "Erro ao buscar clientes" });
}

}

}

export {ListClientController}