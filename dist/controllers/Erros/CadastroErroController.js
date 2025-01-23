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
exports.CreateErroController = void 0;
const CadastroErroService_1 = require("../../services/Erros/CadastroErroService");
class CreateErroController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, causa, solucao } = req.body;
            // Criação do serviço de cadastro de erro
            const createErroService = new CadastroErroService_1.CreateErroService();
            try {
                // Verifica se foi feito upload de arquivo (imagem do erro)
                if (!req.file) {
                    throw new Error("Erro: Arquivo não enviado.");
                }
                const { originalname, filename: imagem } = req.file;
                // Chama o serviço para criar o erro
                const erro = yield createErroService.execute({
                    nome,
                    causa,
                    solucao,
                    imagem,
                });
                // Retorna o erro criado com sucesso
                return res.json(erro);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.CreateErroController = CreateErroController;
