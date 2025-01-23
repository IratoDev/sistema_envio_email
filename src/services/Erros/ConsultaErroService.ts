import prismaClient from "../../prisma";

class ConsultaErroService{

async execute(){

const erros = await prismaClient.erros.findMany({

select:{

id:true,
nome:true,
causa:true,
solucao:true,
imagem:true,

}

})

return erros;

}

}

export {ConsultaErroService}