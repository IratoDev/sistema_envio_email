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
exports.EnvioEmailService = void 0;
const fs_1 = __importDefault(require("fs")); // Importe o módulo fs
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
class EnvioEmailService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome, email, arquivoPath }) {
            // Verifica se o arquivo existe
            if (!fs_1.default.existsSync(arquivoPath)) {
                console.error('Arquivo não encontrado:', arquivoPath);
                throw new Error('Arquivo não encontrado.'); // Lança um erro se o arquivo não existir
            }
            const DataAtual = new Date();
            const Mes = DataAtual.getMonth();
            const Ano = DataAtual.getFullYear();
            const NomeMes = () => {
                const meses = [
                    "Janeiro", "Fevereiro", "Março", "Abril", "Maio",
                    "Junho", "Julho", "Agosto", "Setembro", "Outubro",
                    "Novembro", "Dezembro"
                ];
                return meses[Mes - 1] || "Dezembro";
            };
            const Mensagem = `Boa Tarde,

Segue o Arquivo XML Referente ao mês de ${NomeMes()} de ${Ano}.
Qualquer dúvida estou à disposição.

Obrigado!

Atenção,

Marcello Félix
43 99146.5959`;
            console.log('Caminho do arquivo:', arquivoPath);
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'renan.clickcerto@gmail.com',
                    pass: process.env.senhaEmail
                }
            });
            try {
                const info = yield transporter.sendMail({
                    from: '"ClickCerto" <renan.clickcerto@gmail.com>',
                    to: email,
                    subject: `XML | ${nome} | ${NomeMes()} DE ${Ano}`,
                    text: Mensagem,
                    attachments: [{
                            filename: path_1.default.basename(arquivoPath), // Usar apenas o nome do arquivo
                            path: arquivoPath // Aqui, você usa o caminho do arquivo diretamente
                        }]
                });
                console.log('E-mail enviado com sucesso:', info.messageId);
            }
            catch (error) {
                console.error('Erro ao enviar e-mail:', error);
                throw new Error("Erro ao enviar e-mail."); // Lança o erro para ser tratado na chamada da função
            }
        });
    }
}
exports.EnvioEmailService = EnvioEmailService;
