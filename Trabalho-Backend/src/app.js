import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import { ZodError } from 'zod';
import prismaPlugin from './plugins/prisma.js';
import swaggerPlugin from './plugins/swagger.js';
import authPlugin from './plugins/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function buildApp() {
    const app = Fastify({ logger: true });

    await app.register(cors);
    await app.register(sensible);

    // tratamento de erro central — registrado ANTES das rotas para que elas
    // (carregadas pelo autoload) herdem este handler
    app.setErrorHandler((error, request, reply) => {
        request.log.error(error);

        // erros de validação do Zod viram 400 com a lista de campos
        if (error instanceof ZodError) {
            return reply.status(400).send({
                erro: 'Dados inválidos.',
                campos: error.issues.map((i) => ({
                    campo: i.path.join('.'),
                    mensagem: i.message,
                })),
            });
        }

        const statusCode = error.statusCode ?? 500;
        reply.status(statusCode).send({
            erro:
                statusCode >= 500
                    ? 'Não foi possível processar sua solicitação.'
                    : error.message,
        });
    });

    await swaggerPlugin(app);
    await prismaPlugin(app);
    await authPlugin(app);

    await app.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
    });

    return app;
}