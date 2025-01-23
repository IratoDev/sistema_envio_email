import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { EnvioEmailService } from "./services/EnvioEmail/EnvioEmailService"; // Importa o serviço de envio de e-mail

// Cliente
import { CreateClientController } from "./controllers/Cliente/CreateClientController";
import { ListClientController } from "./controllers/Cliente/ListClientController";
import { AtualizaStatusController } from "./controllers/EnvioEmail/AtualizaStatusController";
import { UpdateClientController } from "./controllers/Cliente/UpdateClientController";
import { RemoveClienteController } from "./controllers/Cliente/RemoveClienteController";

//sistem
import { CreateSistemController } from "./controllers/Sistem/CreateSistemController";
import { ListSistemController } from "./controllers/Sistem/ListSistemController";

//error
import { CreateErroController } from "./controllers/Erros/CadastroErroController";
import { ConsultaErroController } from "./controllers/Erros/ConsultaErroController";
import { RemoveErroController } from "./controllers/Erros/RemoveErroController";
import { UpdateErroController } from "./controllers/Erros/UpdateErroController";

const router = Router();

// Configuração do multer para salvar arquivos no diretório "uploads" com nomes exclusivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const finalFileName = uniqueSuffix + path.extname(file.originalname);
        cb(null, finalFileName);
    }
});

const upload = multer({ storage });

// Rota de cadastro de cliente
router.post("/cadastro/cliente", new CreateClientController().handle);
router.get('/consulta', new ListClientController().handle);
router.put('/status/update/:id', new AtualizaStatusController().handle);
router.put('/update/:id', new UpdateClientController().handle)
router.delete('/cliente/remove/:id', new RemoveClienteController().handle)


//rota Sitema
router.post("/cadastro/sistem", new CreateSistemController().handle);
router.get('/consulta/sistem', new ListSistemController().handle);

// Rota de envio de e-mail com upload de arquivo
router.post("/envio", upload.single('arquivo'), async (req: Request, res: Response) => {
    const { nome, email } = req.body;
    const arquivoPath = req.file?.path; // Obtém o caminho do arquivo enviado

    // Verificação do caminho do arquivo
    console.log("Dados recebidos:", { nome, email, arquivoPath });

    if (!arquivoPath) {
        return res.status(400).send("Arquivo não encontrado.");
    }

    try {
        const envioEmailService = new EnvioEmailService(); // Cria uma nova instância do serviço de envio de e-mail
        await envioEmailService.execute({ nome, email, arquivoPath });
        res.status(200).send("Email enviado com sucesso.");
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).send("Erro ao enviar e-mail.");
    }
});

//rota erros
router.post("/cadastro/erro", upload.single("imagem"), new CreateErroController().handle);
router.get("/consulta/erros", new ConsultaErroController().handle);
router.delete('/erro/remove/:id', new RemoveErroController().handle);
router.put('/erro/update/:id', upload.single('files'), new UpdateErroController().handle)

export { router };
