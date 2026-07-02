import bcrypt from 'bcrypt';

// cria um usuário com a senha criptografada (hash)
export async function criarUsuario(prisma, { nome, email, senha, papel = 'OPERADOR' }) {
    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) {
        const erro = new Error('Já existe um usuário com este e-mail.');
        erro.statusCode = 409;
        throw erro;
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
        data: { nome, email, senha: senhaHash, papel },
    });
    return { id: usuario.id, nome: usuario.nome, email: usuario.email, papel: usuario.papel };
}

// lista os usuários cadastrados (sem expor a senha)
export async function listarUsuarios(prisma) {
    return prisma.usuario.findMany({
        orderBy: { id: 'asc' },
        select: { id: true, nome: true, email: true, papel: true, criadoEm: true },
    });
}

// confere e-mail e senha; retorna o usuário (sem a senha) se estiver correto
export async function autenticar(prisma, { email, senha }) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        const erro = new Error('E-mail ou senha inválidos.');
        erro.statusCode = 401;
        throw erro;
    }
    return { id: usuario.id, nome: usuario.nome, email: usuario.email, papel: usuario.papel };
}