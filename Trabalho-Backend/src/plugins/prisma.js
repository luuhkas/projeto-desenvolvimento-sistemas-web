import { PrismaClient } from '@prisma/client';

// conecta o Prisma e deixa disponível em toda a app como "app.prisma"
export default async function prismaPlugin(app) {
    const prisma = new PrismaClient();
    await prisma.$connect();

    app.decorate('prisma', prisma);

    // fecha a conexão com o banco quando o servidor é encerrado
    app.addHook('onClose', async () => {
        await prisma.$disconnect();
    });
}