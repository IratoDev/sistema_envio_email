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
exports.AtualizaStatusController = void 0;
const AtualizaStatusService_1 = require("../../services/EnvioEmail/AtualizaStatusService");
class AtualizaStatusController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status_email } = req.body;
            try {
                // Chama o service para atualizar os dados no banco
                const produtoAtualizado = yield (0, AtualizaStatusService_1.updateStatus)(id);
                if (!produtoAtualizado) {
                    return res.status(404).json({ error: "cliente não encontrado" });
                }
                return res.status(200).json({ message: "status atualizado com sucesso", produto: produtoAtualizado });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Erro ao atualizar o status" });
            }
        });
    }
}
exports.AtualizaStatusController = AtualizaStatusController;
