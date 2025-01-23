import prismaClient from "../../prisma";

class ListClientService{

async execute(){

const cliente = await prismaClient.client.findMany({

select:{

id:true,
name:true,
email:true,
status_email:true,
numero_maquina:true,
fiscal:true,
obs:true,
type:true,
sistem_id:true

}

})

return cliente;

}

}

export {ListClientService}