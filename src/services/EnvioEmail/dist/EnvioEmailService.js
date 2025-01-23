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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.EnvioEmailService = void 0;
var fs_1 = require("fs"); // Importe o módulo fs
var path_1 = require("path");
var nodemailer_1 = require("nodemailer");
require("dotenv/config");
var EnvioEmailService = /** @class */ (function () {
    function EnvioEmailService() {
    }
    EnvioEmailService.prototype.execute = function (_a) {
        var nome = _a.nome, email = _a.email, arquivoPath = _a.arquivoPath;
        return __awaiter(this, void 0, void 0, function () {
            var DataAtual, Mes, Ano, NomeMes, Mensagem, transporter, info, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Verifica se o arquivo existe
                        if (!fs_1["default"].existsSync(arquivoPath)) {
                            console.error('Arquivo não encontrado:', arquivoPath);
                            throw new Error('Arquivo não encontrado.'); // Lança um erro se o arquivo não existir
                        }
                        DataAtual = new Date();
                        Mes = DataAtual.getMonth();
                        Ano = DataAtual.getFullYear();
                        NomeMes = function () {
                            var meses = [
                                "Janeiro", "Fevereiro", "Março", "Abril", "Maio",
                                "Junho", "Julho", "Agosto", "Setembro", "Outubro",
                                "Novembro", "Dezembro"
                            ];
                            return meses[Mes - 1] || "Dezembro";
                        };
                        Mensagem = "Boa Tarde,\n\nSegue o Arquivo XML Referente ao m\u00EAs de " + NomeMes() + " de " + Ano + ".\nQualquer d\u00FAvida estou \u00E0 disposi\u00E7\u00E3o.\n\nObrigado!\n\nAten\u00E7\u00E3o,\n\nMarcello F\u00E9lix\n43 99146.5959";
                        console.log('Caminho do arquivo:', arquivoPath);
                        transporter = nodemailer_1["default"].createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.emailUser,
                                pass: process.env.senhaEmail
                            }
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, transporter.sendMail({
                                from: '"ClickCerto" <process.env.emailUser>',
                                to: email,
                                subject: "XML | " + nome + " | " + NomeMes() + " DE " + Ano,
                                text: Mensagem,
                                attachments: [{
                                        filename: path_1["default"].basename(arquivoPath),
                                        path: arquivoPath // Aqui, você usa o caminho do arquivo diretamente
                                    }]
                            })];
                    case 2:
                        info = _b.sent();
                        console.log('E-mail enviado com sucesso:', info.messageId);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error('Erro ao enviar e-mail:', error_1);
                        throw new Error("Erro ao enviar e-mail."); // Lança o erro para ser tratado na chamada da função
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return EnvioEmailService;
}());
exports.EnvioEmailService = EnvioEmailService;
