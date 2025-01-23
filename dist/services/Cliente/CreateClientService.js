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
exports.CreateClientService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateClientService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, status_email, numero_maquina, fiscal, sistem, type, obs }) {
            //verifica se esse email já esta cadastrado
            const userAlreadyExists = yield prisma_1.default.client.findFirst({
                where: {
                    name: name
                }
            });
            if (userAlreadyExists) {
                throw new Error("nome de cliente já cadastrado");
            }
            const Client = yield prisma_1.default.client.create({
                data: {
                    name: name,
                    email: email,
                    status_email: status_email,
                    numero_maquina: numero_maquina,
                    fiscal: fiscal,
                    type: type,
                    obs: obs,
                    sistem_id: sistem,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    status_email: true,
                    numero_maquina: true,
                }
            });
            return Client;
        });
    }
}
exports.CreateClientService = CreateClientService;
