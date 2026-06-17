import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export default async function swaggerPlugin(app) {
    await app.register(swagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'API de Estoque',
                description: 'API REST do Sistema de Estoque (Node.js, Fastify, Prisma, SQLite).',
                version: '1.0.0',
            },
            tags: [
                { name: 'status', description: 'Verificação da API' },
                { name: 'auth', description: 'Cadastro e login' },
                { name: 'produtos', description: 'CRUD de produtos' },
                { name: 'baixas', description: 'Saídas de estoque' },
                { name: 'usuarios', description: 'Usuários do sistema' },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
                },
            },
        },
    });

    await app.register(swaggerUi, { routePrefix: '/docs' });
}