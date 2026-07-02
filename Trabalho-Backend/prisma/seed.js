import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1) Usuário administrador — upsert pelo e-mail (que é único):
  //    se já existe, não faz nada; se não, cria. Nunca duplica.
  const senhaHash = await bcrypt.hash('123456', 10);
  await prisma.usuario.upsert({
    where: { email: 'npc.estudos@gmail.com' },
    update: { papel: 'SUPER_ADMIN' },
    create: { nome: 'Super Admin', email: 'npc.estudos@gmail.com', senha: senhaHash, papel: 'SUPER_ADMIN' },
  });

  // 2) Produtos de exemplo — só cria se a tabela estiver vazia.
  const total = await prisma.produto.count();
  if (total === 0) {
    await prisma.produto.createMany({
      data: [
        { nome: 'Teclado Mecânico', categoria: 'Periféricos', quantidade: 30, minimo: 10 },
        { nome: 'Mouse Sem Fio', categoria: 'Periféricos', quantidade: 8, minimo: 12 },
        { nome: 'Monitor 24 pol', categoria: 'Monitores', quantidade: 15, minimo: 5 },
        { nome: 'Cabo HDMI 2m', categoria: 'Cabos', quantidade: 50, minimo: 20 },
        { nome: 'SSD 480GB', categoria: 'Armazenamento', quantidade: 4, minimo: 6 },
      ],
    });
  }

  // 3) Configuração padrão da rotina de balanço diário (linha única)
  await prisma.rotinaConfig.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });

  console.log('✓ Seed concluído: admin + produtos de exemplo.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
