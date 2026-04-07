const inputNome = document.querySelector('#nome');
const mensagem = document.querySelector('#mensagem');

inputNome.addEventListener('input', () => {
    const nome = inputNome.value.trim();

    inputNome.classList.remove('border-borderWarm', 'border-red-500', 'border-green-500');
    mensagem.classList.remove('text-red-600', 'text-green-600');

    if (nome.length < 3) {
        mensagem.textContent = 'O nome deve ter pelo menos 3 caracteres.';
        inputNome.classList.add('border-red-500');
        mensagem.classList.add('text-red-600');
    } else {
        mensagem.textContent = 'Nome válido.';
        inputNome.classList.add('border-green-500');
        mensagem.classList.add('text-green-600');
    }
});
