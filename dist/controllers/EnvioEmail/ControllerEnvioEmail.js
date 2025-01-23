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
exports.EnvioEmailController = void 0;
const EnvioEmailService_1 = require("../../services/EnvioEmail/EnvioEmailService");
class EnvioEmailController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, arquivoPath, email } = req.body;
            console.log('Dados recebidos:', { nome, arquivoPath, email });
            const envioEmailService = new EnvioEmailService_1.EnvioEmailService();
            try {
                const envio = yield envioEmailService.execute({ nome, arquivoPath, email });
                return res.json(envio);
            }
            catch (error) {
                console.error('Erro ao enviar e-mail:', error);
                return res.status(500).json({ error: 'Erro ao enviar e-mail.' });
            }
        });
    }
}
exports.EnvioEmailController = EnvioEmailController;
