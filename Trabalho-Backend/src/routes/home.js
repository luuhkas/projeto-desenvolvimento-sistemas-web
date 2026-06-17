//uma rota de teste pra ver a API funcionando:

export default async function homeRoutes(app) {
    app.get('/', {
        schema: { tags: ['status'], summary: 'Verifica se a API está no ar' },
    }, async () => ({
        mensagem: 'API de Estoque funcionando!',
    }));
}