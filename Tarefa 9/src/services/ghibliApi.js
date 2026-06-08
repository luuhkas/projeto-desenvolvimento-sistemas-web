const API_URL = 'https://ghibliapi.dev/films';

async function consumirApi(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    throw new Error('Erro ao consultar a API publica de filmes.');
  }
}

function resumirFilme(filme) {
  return {
    id: filme.id,
    titulo: filme.title,
    tituloOriginal: filme.original_title,
    diretor: filme.director,
    anoLancamento: filme.release_date,
    nota: filme.rt_score,
  };
}

function detalharResposta(filme) {
  return {
    ...resumirFilme(filme),
    descricao: filme.description,
    produtor: filme.producer,
    duracao: filme.running_time,
  };
}

export async function listarFilmes() {
  const filmes = await consumirApi(API_URL);
  return filmes.map(resumirFilme);
}

export async function detalharFilme(id) {
  const filme = await consumirApi(`${API_URL}/${id}`);
  return filme ? detalharResposta(filme) : null;
}

export async function buscarFilmesPorTitulo(termo) {
  const termoNormalizado = termo.toLowerCase();
  const filmes = await listarFilmes();

  return filmes.filter((filme) => (
    filme.titulo.toLowerCase().includes(termoNormalizado)
    || filme.tituloOriginal.toLowerCase().includes(termoNormalizado)
  ));
}
