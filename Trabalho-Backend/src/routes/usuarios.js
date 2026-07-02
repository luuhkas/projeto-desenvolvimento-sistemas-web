import { listarUsuarios } from '../services/usuarioService.js';

export default async function usuariosRoutes(app) {
  // LISTAR usuários (privado)
  app.get('/usuarios', {
    preHandler: [app.autorizar('usuario:listar')],
    schema: {
      tags: ['usuarios'],
      summary: 'Lista os usuários (requer login)',
      security: [{ bearerAuth: [] }],
    },
  }, async () => listarUsuarios(app.prisma));
}
