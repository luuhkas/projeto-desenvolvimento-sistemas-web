import { randomUUID } from 'node:crypto';
import { criarUsuario } from './usuarioService.js';

const VALIDADE_HORAS = Number(process.env.CONVITE_VALIDADE_HORAS ?? 48);

// cria um convite com token único e prazo de validade
export async function criarConvite(prisma, { email, papel, criadoPor }) {
  const jaExiste = await prisma.usuario.findUnique({ where: { email } });
  if (jaExiste) {
    const e = new Error('Este e-mail já possui cadastro.');
    e.statusCode = 409;
    throw e;
  }
  const expiraEm = new Date(Date.now() + VALIDADE_HORAS * 60 * 60 * 1000);
  return prisma.convite.create({
    data: { email, papel, criadoPor, token: randomUUID(), expiraEm },
  });
}

// valida um token: existe? não usado? não expirou?
export async function buscarConviteValido(prisma, token) {
  const c = await prisma.convite.findUnique({ where: { token } });
  if (!c) {
    const e = new Error('Convite não encontrado.'); e.statusCode = 404; throw e;
  }
  if (c.usadoEm) {
    const e = new Error('Convite já utilizado.'); e.statusCode = 410; throw e;
  }
  if (c.expiraEm < new Date()) {
    const e = new Error('Convite expirou.'); e.statusCode = 410; throw e;
  }
  return c;
}

// aceita o convite: cria o usuário e queima o convite (atômico)
export async function aceitarConvite(prisma, { token, nome, senha }) {
  const convite = await buscarConviteValido(prisma, token);
  return prisma.$transaction(async (tx) => {
    const usuario = await criarUsuario(tx, {
      nome, email: convite.email, senha, papel: convite.papel,
    });
    await tx.convite.update({ where: { id: convite.id }, data: { usadoEm: new Date() } });
    return usuario;
  });
}
