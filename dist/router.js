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
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const EnvioEmailService_1 = require("./services/EnvioEmail/EnvioEmailService"); // Importa o serviço de envio de e-mail
// Cliente
const CreateClientController_1 = require("./controllers/Cliente/CreateClientController");
const ListClientController_1 = require("./controllers/Cliente/ListClientController");
const AtualizaStatusController_1 = require("./controllers/EnvioEmail/AtualizaStatusController");
const UpdateClientController_1 = require("./controllers/Cliente/UpdateClientController");
const RemoveClienteController_1 = require("./controllers/Cliente/RemoveClienteController");
//sistem
const CreateSistemController_1 = require("./controllers/Sistem/CreateSistemController");
const ListSistemController_1 = require("./controllers/Sistem/ListSistemController");
//error
const CadastroErroController_1 = require("./controllers/Erros/CadastroErroController");
const ConsultaErroController_1 = require("./controllers/Erros/ConsultaErroController");
const RemoveErroController_1 = require("./controllers/Erros/RemoveErroController");
const router = (0, express_1.Router)();
exports.router = router;
// Configuração do multer para salvar arquivos no diretório "uploads" com nomes exclusivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const finalFileName = uniqueSuffix + path_1.default.extname(file.originalname);
        cb(null, finalFileName);
    }
});
const upload = (0, multer_1.default)({ storage });
// Rota de cadastro de cliente
router.post("/cadastro/cliente", new CreateClientController_1.CreateClientController().handle);
router.get('/consulta', new ListClientController_1.ListClientController().handle);
router.put('/status/update/:id', new AtualizaStatusController_1.AtualizaStatusController().handle);
router.put('/update/:id', new UpdateClientController_1.UpdateClientController().handle);
router.delete('/cliente/remove/:id', new RemoveClienteController_1.RemoveClienteController().handle);
//rota Sitema
router.post("/cadastro/sistem", new CreateSistemController_1.CreateSistemController().handle);
router.get('/consulta/sistem', new ListSistemController_1.ListSistemController().handle);
// Rota de envio de e-mail com upload de arquivo
router.post("/envio", upload.single('arquivo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { nome, email } = req.body;
    const arquivoPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // Obtém o caminho do arquivo enviado
    // Verificação do caminho do arquivo
    console.log("Dados recebidos:", { nome, email, arquivoPath });
    if (!arquivoPath) {
        return res.status(400).send("Arquivo não encontrado.");
    }
    try {
        const envioEmailService = new EnvioEmailService_1.EnvioEmailService(); // Cria uma nova instância do serviço de envio de e-mail
        yield envioEmailService.execute({ nome, email, arquivoPath });
        res.status(200).send("Email enviado com sucesso.");
    }
    catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).send("Erro ao enviar e-mail.");
    }
}));
//rota erros
router.post("/cadastro/erro", upload.single("imagem"), new CadastroErroController_1.CreateErroController().handle);
router.get("/consulta/erros", new ConsultaErroController_1.ConsultaErroController().handle);
router.delete('/erro/remove/:id', new RemoveErroController_1.RemoveErroController().handle);
