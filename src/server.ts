import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from "cors";
import { router } from "./router";
import path from 'path';


const app = express();

const cron = require('node-cron');
const { atualizarStatusClientes } = require('./services/AtualizaStatus/AtualizaStatusService');

// Agenda a tarefa para o dia 1 de cada mês às 09:30
cron.schedule('30 9 1 * *', async () => {
    console.log('Iniciando atualização mensal de status dos clientes...');
    await atualizarStatusClientes();
});

// Aplicar CORS antes das rotas
app.use(cors());
app.use(express.json());
app.use(router);

app.use('/files', express.static(path.join(__dirname, ".." ,'uploads')));

// Tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "internal server error"
    });
});

app.listen(3333, () => console.log("servidor online"));
