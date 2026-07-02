import jwt from '@fastify/jwt';
import { pode } from '../auth/policies.js';

// registra o JWT e cria o app.authenticate / app.autorizar
export default async function authPlugin(app) {
    await app.register(jwt, {
        secret: process.env.JWT_SECRET,
    });

    // exige um token válido; usado como preHandler nas rotas privadas
    app.decorate('authenticate', async (request) => {
        try {
            await request.jwtVerify();
        } catch {
            throw app.httpErrors.unauthorized('Token inválido ou ausente.');
        }
    });

    // autorização ABAC: verifica o token E aplica a política da ação.
    // uso simples:  preHandler: [app.autorizar('produto:criar')]
    // com recurso:  app.autorizar('baixa:estornar', (req, app) =>
    //                 app.prisma.baixa.findUnique({ where: { id: Number(req.params.id) } }))
    app.decorate('autorizar', (acao, carregarRecurso) => {
        return async (request) => {
            try {
                await request.jwtVerify();
            } catch {
                throw app.httpErrors.unauthorized('Token inválido ou ausente.');
            }
            const resource = carregarRecurso ? await carregarRecurso(request, app) : null;
            const permitido = pode(acao, {
                user: request.user,
                resource,
                ctx: { agora: new Date() },
            });
            if (!permitido) {
                throw app.httpErrors.forbidden('Acesso negado pela política (ABAC).');
            }
        };
    });
}