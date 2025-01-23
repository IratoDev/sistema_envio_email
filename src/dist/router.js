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
exports.router = void 0;
var express_1 = require("express");
var multer_1 = require("multer");
var path_1 = require("path");
var EnvioEmailService_1 = require("./services/EnvioEmail/EnvioEmailService"); // Importa o serviço de envio de e-mail
// Cliente
var CreateClientController_1 = require("./controllers/Cliente/CreateClientController");
var ListClientController_1 = require("./controllers/Cliente/ListClientController");
var AtualizaStatusController_1 = require("./controllers/EnvioEmail/AtualizaStatusController");
var UpdateClientController_1 = require("./controllers/Cliente/UpdateClientController");
var RemoveClienteController_1 = require("./controllers/Cliente/RemoveClienteController");
//sistem
var CreateSistemController_1 = require("./controllers/Sistem/CreateSistemController");
var ListSistemController_1 = require("./controllers/Sistem/ListSistemController");
//error
var CadastroErroController_1 = require("./controllers/Erros/CadastroErroController");
var ConsultaErroController_1 = require("./controllers/Erros/ConsultaErroController");
var RemoveErroController_1 = require("./controllers/Erros/RemoveErroController");
var UpdateErroController_1 = require("./controllers/Erros/UpdateErroController");
var router = express_1.Router();
exports.router = router;
// Configuração do multer para salvar arquivos no diretório "uploads" com nomes exclusivos
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        var finalFileName = uniqueSuffix + path_1["default"].extname(file.originalname);
        cb(null, finalFileName);
    }
});
var upload = multer_1["default"]({ storage: storage });
// Rota de cadastro de cliente
router.post("/cadastro/cliente", new CreateClientController_1.CreateClientController().handle);
router.get('/consulta', new ListClientController_1.ListClientController().handle);
router.put('/status/update/:id', new AtualizaStatusController_1.AtualizaStatusController().handle);
router.put('/update/:id', new UpdateClientController_1.UpdateClientController().handle);
router["delete"]('/cliente/remove/:id', new RemoveClienteController_1.RemoveClienteController().handle);
//rota Sitema
router.post("/cadastro/sistem", new CreateSistemController_1.CreateSistemController().handle);
router.get('/consulta/sistem', new ListSistemController_1.ListSistemController().handle);
// Rota de envio de e-mail com upload de arquivo
router.post("/envio", upload.single('arquivo'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, email, arquivoPath, envioEmailService, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, nome = _a.nome, email = _a.email;
                arquivoPath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                // Verificação do caminho do arquivo
                console.log("Dados recebidos:", { nome: nome, email: email, arquivoPath: arquivoPath });
                if (!arquivoPath) {
                    return [2 /*return*/, res.status(400).send("Arquivo não encontrado.")];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                envioEmailService = new EnvioEmailService_1.EnvioEmailService();
                return [4 /*yield*/, envioEmailService.execute({ nome: nome, email: email, arquivoPath: arquivoPath })];
            case 2:
                _c.sent();
                res.status(200).send("Email enviado com sucesso.");
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                console.error("Erro ao enviar e-mail:", error_1);
                res.status(500).send("Erro ao enviar e-mail.");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//rota erros
router.post("/cadastro/erro", upload.single("imagem"), new CadastroErroController_1.CreateErroController().handle);
router.get("/consulta/erros", new ConsultaErroController_1.ConsultaErroController().handle);
router["delete"]('/erro/remove/:id', new RemoveErroController_1.RemoveErroController().handle);
router.put('/erro/update/:id', upload.single('files'), new UpdateErroController_1.UpdateErroController().handle);
