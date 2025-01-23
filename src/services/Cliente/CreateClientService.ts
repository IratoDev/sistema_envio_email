
import { Decimal } from "@prisma/client/runtime/library";
import  prismaClient from "../../prisma";

interface ClientRequest{

name:string;
email:string;
status_email:boolean;
numero_maquina: Decimal;
type:string;
fiscal:string;
sistem:string;
obs:string;

}


class CreateClientService {

async execute({name, email, status_email,numero_maquina,fiscal,sistem,type,obs}:ClientRequest){



//verifica se esse email já esta cadastrado
const userAlreadyExists = await prismaClient.client.findFirst({

    where:{

    name:name

    }

})

if(userAlreadyExists){

throw new Error("nome de cliente já cadastrado")

}

const Client = await prismaClient.client.create({

data:{

name:name,
email:email,
status_email:status_email,
numero_maquina:numero_maquina,
fiscal:fiscal,
type:type,
obs:obs,
sistem_id:sistem,

},


select:{

id:true,
email:true,
name:true,
status_email:true,
numero_maquina:true,

}

})

return Client;

}

}

export{CreateClientService}