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
exports.RemoveErroController = void 0;
const RemoveErroService_1 = require("../../services/Erros/RemoveErroService");
class RemoveErroController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log("ID recebido no controlador:", id); // Log do ID recebido
            const removeErroService = new RemoveErroService_1.RemoveErroService();
            try {
                const erro = yield removeErroService.execute({ Erro_id: id });
                return res.json(erro);
            }
            catch (error) {
                return res.status(404).json({ error: 'Erro não encontrado' });
            }
        });
    }
}
exports.RemoveErroController = RemoveErroController;
