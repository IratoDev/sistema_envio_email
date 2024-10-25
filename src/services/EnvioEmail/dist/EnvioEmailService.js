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
var EnvioEmailService = /** @class */ (function () {
    function EnvioEmailService() {
    }
    EnvioEmailService.prototype.execute = function (_a) {
        var nome = _a.nome, arquivo = _a.arquivo;
        return __awaiter(this, void 0, void 0, function () {
            var nodemailer, Clientes, DataAtual, Mes, Ano, NomeMes, ClienteSolicitado, Mensagem, _b, transporter, enviarEmail;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        nodemailer = require('nodemailer');
                        Clientes = [
                            { nome: "teste1", email: "email.exemplo@.com", status: false },
                            { nome: "teste2", email: "email.exemplo@.com", status: false },
                        ];
                        DataAtual = new Date();
                        Mes = DataAtual.getMonth();
                        Ano = DataAtual.getFullYear();
                        NomeMes = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (Mes) {
                                    case 0:
                                        return [2 /*return*/, "Janeiro"];
                                        break;
                                    case 1:
                                        return [2 /*return*/, "Fevereiro"];
                                        break;
                                    case 2:
                                        return [2 /*return*/, "Março"];
                                        break;
                                    case 3:
                                        return [2 /*return*/, "Abril"];
                                        break;
                                    case 4:
                                        return [2 /*return*/, "Maio"];
                                        break;
                                    case 5:
                                        return [2 /*return*/, "Junho"];
                                        break;
                                    case 6:
                                        return [2 /*return*/, "Julho"];
                                        break;
                                    case 7:
                                        return [2 /*return*/, "Agosto"];
                                        break;
                                    case 8:
                                        return [2 /*return*/, "Setembro"];
                                        break;
                                    case 9:
                                        return [2 /*return*/, "Outubro"];
                                        break;
                                    case 10:
                                        return [2 /*return*/, "Novembro"];
                                        break;
                                    case 11:
                                        return [2 /*return*/, "Dezembro"];
                                        break;
                                    default:
                                        console.log("Mês inválido");
                                        break;
                                }
                                return [2 /*return*/];
                            });
                        }); };
                        ClienteSolicitado = function () { return __awaiter(_this, void 0, void 0, function () {
                            var cliente;
                            return __generator(this, function (_a) {
                                cliente = Clientes.find(function (cliente) { return cliente.nome === nome; });
                                if (cliente) {
                                    return [2 /*return*/, cliente];
                                }
                                else {
                                    console.log("erro ao verificar cliente");
                                    return [2 /*return*/, null];
                                }
                                return [2 /*return*/];
                            });
                        }); };
                        _b = "Boa Tarde,\n\nSegue o Arquivo XML Referente ao m\u00EAs de ";
                        return [4 /*yield*/, NomeMes()];
                    case 1:
                        Mensagem = _b + (_c.sent()) + " de " + Ano + ".\nQualquer d\u00FAvida estou \u00E0 disposi\u00E7\u00E3o.\n\nObrigado!\n\nAten\u00E7\u00E3o,\n\nMarcello F\u00E9lix\n43 99146.5959";
                        transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: '',
                                pass: '' // senha do e-mail
                            }
                        });
                        enviarEmail = function () { return __awaiter(_this, void 0, void 0, function () {
                            var Destinatario, info, _a, _b, _c, _d, error_1;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, ClienteSolicitado()];
                                    case 1:
                                        Destinatario = _e.sent();
                                        if (!Destinatario) {
                                            console.error("Destinatário não encontrado.");
                                            return [2 /*return*/];
                                        }
                                        _e.label = 2;
                                    case 2:
                                        _e.trys.push([2, 5, , 6]);
                                        _b = (_a = transporter).sendMail;
                                        _c = {
                                            from: '"Seu Nome" <seu email>',
                                            to: Destinatario.email
                                        };
                                        _d = "XML | " + Destinatario.nome + " | ";
                                        return [4 /*yield*/, NomeMes()];
                                    case 3: return [4 /*yield*/, _b.apply(_a, [(_c.subject = _d + (_e.sent()) + " DE " + Ano,
                                                _c.text = Mensagem,
                                                _c)])];
                                    case 4:
                                        info = _e.sent();
                                        console.log('E-mail enviado com sucesso:', info.messageId);
                                        return [3 /*break*/, 6];
                                    case 5:
                                        error_1 = _e.sent();
                                        console.error('Erro ao enviar e-mail:', error_1);
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [2 /*return*/, enviarEmail()];
                }
            });
        });
    };
    return EnvioEmailService;
}());
exports.EnvioEmailService = EnvioEmailService;
