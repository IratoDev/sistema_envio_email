import prismaClient from "../../prisma";

class ListSistemService{

async execute(){

const sistem = await prismaClient.sistem.findMany({

select:{

id:true,
name:true

}

})

return sistem;

}

}

export {ListSistemService}