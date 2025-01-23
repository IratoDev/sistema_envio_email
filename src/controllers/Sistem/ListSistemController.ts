import { Request, Response } from "express";
import { ListSistemService } from "../../services/Sistem/ListSistemService";


class ListSistemController{

async handle(req:Request, res:Response){

    const listSistemService = new ListSistemService;

try {

    const sistem = await listSistemService.execute();

    return res.json(sistem);

} catch (error) {
    console.error("Erro ao buscar sistema:", error);
    return res.status(500).json({ error: "Erro ao buscar sistema" });
}

}

}

export {ListSistemController}