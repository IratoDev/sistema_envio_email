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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClient = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updateClient = (id, dados) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifica se o cliente existe
        const clienteExistente = yield prisma.client.findUnique({
            where: { id },
        });
        if (!clienteExistente) {
            throw new Error("Cliente não encontrado");
        }
        // Atualiza os dados do cliente
        const clienteAtualizado = yield prisma.client.update({
            where: { id },
            data: {
                name: dados.name,
                email: dados.email,
                status_email: dados.status_email,
                type: dados.type,
                numero_maquina: dados.numero_maquina,
                fiscal: dados.fiscal,
                sistem_id: dados.sistem_id,
                obs: dados.obs,
                updated_at: new Date(), // Atualiza a data de modificação
            },
        });
        return clienteAtualizado;
    }
    catch (err) {
        console.error("Erro ao atualizar cliente:", err);
        throw new Error("Erro ao atualizar o cliente");
    }
    finally {
        // Fecha a conexão com o banco
        yield prisma.$disconnect();
    }
});
exports.updateClient = updateClient;
