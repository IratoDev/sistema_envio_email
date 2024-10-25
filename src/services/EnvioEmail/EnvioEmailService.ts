
interface EnvioResquest{

nome:string;
arquivo:string
  
}

class EnvioEmailService{

async execute({nome,arquivo}:EnvioResquest){
const nodemailer = require('nodemailer');

const Clientes = [

{nome:"teste1",email:"email.exemplo@.com",status:false},
{nome:"teste2",email:"email.exemplo@.com",status:false},
  
];

const DataAtual = new Date();
const Mes = DataAtual.getMonth();
const Ano = DataAtual.getFullYear();
  
const NomeMes = async ()=>{
    
 switch(Mes){

  case 0:
  return "Janeiro" ;
  break;
  case 1:
  return "Fevereiro" ;
  break;
  case 2:
  return "Março" ;
  break;
  case 3:
  return "Abril" ;
  break;
  case 4:
  return "Maio" ;
  break;
  
  case 5:
  return "Junho" ;
  break;
  case 6:
  return "Julho" ;
  break;
  case 7:
  return "Agosto" ;
  break;
  case 8:
  return "Setembro" ;
  break;
  case 9:
  return "Outubro" ;
  break;
  case 10:
  return "Novembro" ;
  break;
  
  case 11:
  return "Dezembro" ;
  break;
  default:
  console.log("Mês inválido");
  break;
  }

};

const ClienteSolicitado = async ()=>{

const cliente = Clientes.find(cliente => cliente.nome === nome);

if(cliente){

return cliente

}else{

console.log("erro ao verificar cliente")
return null;

}


}

//mensagem padrão
const Mensagem = `Boa Tarde,

Segue o Arquivo XML Referente ao mês de ${await NomeMes()} de ${Ano}.
Qualquer dúvida estou à disposição.

Obrigado!

Atenção,

Marcello Félix
43 99146.5959`;

  // Configuração do transportador (transporter) de e-mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '', // e-mail
      pass: '' // senha do e-mail
    }
  });

  
  // Função para enviar e-mail
  const enviarEmail = async () => {

  const Destinatario = await ClienteSolicitado();

  if (!Destinatario) {
    console.error("Destinatário não encontrado.");
    return;
  }

    try {

      // Configuração do e-mail
      const info = await transporter.sendMail({

        from: '"Seu Nome" <seu email>', // Remetente
        to: Destinatario.email, // Destinatário
        subject: `XML | ${Destinatario.nome} | ${await NomeMes()} DE ${Ano}`, // Assunto
        text: Mensagem, // Texto simples
      });
  
      console.log('E-mail enviado com sucesso:', info.messageId);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  };


return enviarEmail();

}

}

export {EnvioEmailService}


