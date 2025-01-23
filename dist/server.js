"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./router");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const cron = require('node-cron');
const { atualizarStatusClientes } = require('./services/AtualizaStatus/AtualizaStatusService');
// Agenda a tarefa para o dia 1 de cada mês às 09:30
cron.schedule('30 9 1 * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Iniciando atualização mensal de status dos clientes...');
    yield atualizarStatusClientes();
}));
// Aplicar CORS antes das rotas
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.router);
app.use('/files', express_1.default.static(path_1.default.join(__dirname, "..", 'uploads')));
// Tratamento de erros
app.use((err, req, res, next) => {
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
