const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function atualizarStatusClientes() {
    try {
        await prisma.cliente.updateMany({
            data: { status: false } // Atualize para `false`
        });
        console.log('Status atualizado para "false" com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar status dos clientes:', error);
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = { atualizarStatusClientes };
