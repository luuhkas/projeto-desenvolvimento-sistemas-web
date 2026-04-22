import profileAvatar from '../assets/profile_avatar.png';

export const perfil = {
  nome: 'Lucas Silva Maues',
  cargo: 'Front-end em formação',
  local: 'Projeto e Desenvolvimento de Sistemas Web',
  resumo:
    'Estudante construindo interfaces com HTML, CSS, JavaScript e React. Esta página funciona como um recorte de portfólio para praticar componentes, JSX e navegação em SPA.',
  imagem: profileAvatar,
};

export const habilidades = [
  { id: 1, nome: 'HTML semântico', nivel: 'Base' },
  { id: 2, nome: 'CSS responsivo', nivel: 'Intermediário' },
  { id: 3, nome: 'Tailwind CSS', nivel: 'Intermediário' },
  { id: 4, nome: 'JavaScript e DOM', nivel: 'Em evolução' },
  { id: 5, nome: 'React com JSX', nivel: 'Introdução' },
];

export const projetos = [
  {
    id: 1,
    titulo: 'TechStore HTML/CSS',
    descricao: 'Primeira versão de uma loja fictícia com HTML semântico, CSS separado, imagens e navegação entre páginas.',
  },
  {
    id: 2,
    titulo: 'TechStore Tailwind',
    descricao: 'Releitura da interface usando Tailwind, tema próprio, responsividade e composição visual por utilitários.',
  },
  {
    id: 3,
    titulo: 'Validação com JavaScript',
    descricao: 'Exercício de DOM com feedback em tempo real, eventos de input e troca dinâmica de classes.',
  },
];
