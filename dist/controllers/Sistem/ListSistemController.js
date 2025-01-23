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
exports.ListSistemController = void 0;
const ListSistemService_1 = require("../../services/Sistem/ListSistemService");
class ListSistemController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listSistemService = new ListSistemService_1.ListSistemService;
            try {
                const sistem = yield listSistemService.execute();
                return res.json(sistem);
            }
            catch (error) {
                console.error("Erro ao buscar sistema:", error);
                return res.status(500).json({ error: "Erro ao buscar sistema" });
            }
        });
    }
}
exports.ListSistemController = ListSistemController;
