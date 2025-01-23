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
exports.updateStatus = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updateStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifica se o cliente existe
        const ClienteExistente = yield prisma.client.findUnique({
            where: { id },
        });
        if (!ClienteExistente) {
            throw new Error("Cliente não encontrado");
        }
        // Atualiza o status para true apenas se for false
        if (!ClienteExistente.status_email) {
            const ClienteAtualizado = yield prisma.client.update({
                where: { id },
                data: { status_email: true },
            });
            return ClienteAtualizado;
        }
        // Retorna o cliente existente sem alterações, já que o status é true
        return ClienteExistente;
    }
    catch (err) {
        console.error(err);
        throw new Error("Erro ao atualizar o status do cliente");
    }
});
exports.updateStatus = updateStatus;
