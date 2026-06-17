//uma rota de teste pra ver a API funcionando:

export default async function homeRoutes(app) {
    app.get('/', async () => ({
        mensagem: 'API de Estoque funcionando!',
    }));
}