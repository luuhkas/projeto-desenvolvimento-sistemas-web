import { registerSchema, loginSchema } from '../schemas/auth.js';
import { criarUsuario, autenticar } from '../services/usuarioService.js';
import { validarEmailReal } from '../services/emailValidator.js';

export default async function authRoutes(app) {
    // cadastro de usuário
    app.post('/auth/register', {
        schema: {
            tags: ['auth'],
            summary: 'Cadastra um novo usuário',
            body: {
                type: 'object',
                properties: {
                    nome: { type: 'string' },
                    email: { type: 'string' },
                    senha: { type: 'string' },
                },
            },
        },
    }, async (request, reply) => {
        const dados = registerSchema.parse(request.body);
        await validarEmailReal(dados.email); // formato + domínio real (MX)
        const usuario = await criarUsuario(app.prisma, dados);
        return reply.status(201).send(usuario);
    });

    // login: devolve um token JWT
    app.post('/auth/login', {
        config: {
            // no máximo 5 tentativas por IP a cada minuto (trava força bruta)
            rateLimit: { max: 5, timeWindow: '1 minute' },
        },
        schema: {
            tags: ['auth'],
            summary: 'Autentica e devolve um token JWT',
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    senha: { type: 'string' },
                },
            },
        },
    }, async (request) => {
        const dados = loginSchema.parse(request.body);
        const usuario = await autenticar(app.prisma, dados);
        const token = app.jwt.sign({ id: usuario.id, email: usuario.email, papel: usuario.papel });
        return { token, usuario };
    });
}