import jwt from '@fastify/jwt';

// registra o JWT e cria o app.authenticate (usado para proteger rotas privadas)
export default async function authPlugin(app) {
    await app.register(jwt, {
        secret: process.env.JWT_SECRET,
    });

    // exige um token válido; será usado como preHandler nas rotas privadas
    app.decorate('authenticate', async (request) => {
        try {
            await request.jwtVerify();
        } catch {
            throw app.httpErrors.unauthorized('Token inválido ou ausente.');
        }
    });
}