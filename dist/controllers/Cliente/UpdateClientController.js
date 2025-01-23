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
exports.UpdateClientController = void 0;
const UpdateClientService_1 = require("../../services/Cliente/UpdateClientService");
class UpdateClientController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // ID do cliente passado na URL
            // Dados que serão atualizados no corpo da requisição
            const { name, email, status_email, type, numero_maquina, fiscal, sistem_id, obs } = req.body;
            try {
                // Chama o service para atualizar os dados do cliente no banco
                const clienteAtualizado = yield (0, UpdateClientService_1.updateClient)(id, {
                    name,
                    email,
                    status_email,
                    type,
                    numero_maquina,
                    fiscal,
                    sistem_id,
                    obs,
                });
                // Retorna erro 404 se o cliente não for encontrado
                if (!clienteAtualizado) {
                    return res.status(404).json({ error: "Cliente não encontrado" });
                }
                // Retorna sucesso com o cliente atualizado
                return res.status(200).json({
                    message: "Cliente atualizado com sucesso",
                    cliente: clienteAtualizado
                });
            }
            catch (err) {
                console.error("Erro ao atualizar cliente:");
                return res.status(500).json({ error: "Erro ao atualizar o cliente" });
            }
        });
    }
}
exports.UpdateClientController = UpdateClientController;
