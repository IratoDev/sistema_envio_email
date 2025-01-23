import { Request, Response } from "express";
import { ConsultaErroService } from "../../services/Erros/ConsultaErroService";

class ConsultaErroController{

async handle(req:Request, res:Response){

    const consultaErroService = new ConsultaErroService;

try {

    const erro = await consultaErroService.execute();

    return res.json(erro);

} catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return res.status(500).json({ error: "Erro ao buscar clientes" });
}

}

}

export {ConsultaErroController}