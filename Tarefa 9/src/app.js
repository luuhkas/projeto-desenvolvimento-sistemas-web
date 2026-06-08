import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AutoLoad from '@fastify/autoload';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import Fastify from 'fastify';
import requestLogger from './plugins/requestLogger.js';
import swaggerPlugin from './plugins/swagger.js';
import { registerMovieSchemas } from './schemas/movieSchemas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors);
  await app.register(sensible);
  await swaggerPlugin(app);
  await requestLogger(app);

  registerMovieSchemas(app);

  await app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { prefix: '' },
  });

  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    const statusCode = error.statusCode ?? 500;

    reply.status(statusCode).send({
      erro: statusCode >= 500 ? 'Nao foi possivel processar sua solicitacao.' : error.message,
    });
  });

  return app;
}
