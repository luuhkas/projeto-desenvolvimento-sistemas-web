// hierarquia simples de papéis (um dos atributos do "subject")
const ADMINS = ['ADMIN', 'SUPER_ADMIN'];

// cada política recebe { user, resource, ctx } e devolve true/false.
//   user     = quem faz (papel, email)      -> subject
//   resource = o que sofre a ação           -> ex.: a baixa, com "responsavel"
//   ctx      = contexto (ex.: ctx.agora)    -> data/hora
const politicas = {
  // catálogo: admins gerenciam; remover é só do Super Admin (ação perigosa)
  'produto:criar':   ({ user }) => ADMINS.includes(user.papel),
  'produto:editar':  ({ user }) => ADMINS.includes(user.papel),
  'produto:remover': ({ user }) => user.papel === 'SUPER_ADMIN',

  // baixa: admins sempre; OPERADOR só em horário comercial (atributo de CONTEXTO)
  'baixa:criar': ({ user, ctx }) => {
    if (ADMINS.includes(user.papel)) return true;
    const h = ctx.agora.getHours();
    return user.papel === 'OPERADOR' && h >= 8 && h < 18;
  },

  // estorno (atributo do RECURSO/dono): quem registrou ou o Super Admin
  'baixa:estornar': ({ user, resource }) =>
    user.papel === 'SUPER_ADMIN' || resource?.responsavel === user.email,

  // gestão de pessoas, convites e relatórios: admins
  'usuario:listar': ({ user }) => ADMINS.includes(user.papel),
  'convite:criar':  ({ user }) => ADMINS.includes(user.papel),
  'relatorio:ver':  ({ user }) => ADMINS.includes(user.papel),

  // backoffice (rotinas, horários, e-mails): exclusivo do Super Admin
  'backoffice:gerir': ({ user }) => user.papel === 'SUPER_ADMIN',
};

// função central de decisão
export function pode(acao, contexto) {
  const politica = politicas[acao];
  if (!politica) return false; // nega por padrão: ação sem política = proibida
  return Boolean(politica(contexto));
}
