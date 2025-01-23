import fs from 'fs'; // Importe o módulo fs
import path from 'path';
import nodemailer from 'nodemailer';
import 'dotenv/config'

interface EnvioRequest {
  nome: string;
  email: string;
  arquivoPath: string; // Altera de arquivo: File para arquivoPath: string
}

class EnvioEmailService {
  async execute({ nome, email, arquivoPath }: EnvioRequest) {
    // Verifica se o arquivo existe
    if (!fs.existsSync(arquivoPath)) {
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

      

      return meses[Mes-1] || "Dezembro";
    };

    const Mensagem = `Boa Tarde,

Segue o Arquivo XML Referente ao mês de ${NomeMes()} de ${Ano}.
Qualquer dúvida estou à disposição.

Obrigado!

Atenção,

Marcello Félix
43 99146.5959`;

console.log('Caminho do arquivo:', arquivoPath);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.emailUser,
        pass:  process.env.senhaEmail
      }
    });

    try {
      const info = await transporter.sendMail({
        from: '"ClickCerto" <process.env.emailUser>',
        to: email,
        subject: `XML | ${nome} | ${NomeMes()} DE ${Ano}`,
        text: Mensagem,
        attachments: [{
          filename: path.basename(arquivoPath), // Usar apenas o nome do arquivo
          path: arquivoPath // Aqui, você usa o caminho do arquivo diretamente
        }]
      });

      console.log('E-mail enviado com sucesso:', info.messageId);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new Error("Erro ao enviar e-mail."); // Lança o erro para ser tratado na chamada da função
    }
  }
}

export { EnvioEmailService };
