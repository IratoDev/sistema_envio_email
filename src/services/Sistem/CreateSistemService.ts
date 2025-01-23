
import  prismaClient from "../../prisma";

interface SistemRequest{

name:string;

}

class CreateSistemService {

async execute({name}:SistemRequest){

const sistem = await prismaClient.sistem.create({

data:{

name:name,

},

select:{

id:true,
name:true,

}

})

return sistem;

}

}

export{CreateSistemService}