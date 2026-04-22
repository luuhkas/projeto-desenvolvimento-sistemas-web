#!/bin/zsh
clear

cd "$(dirname "$0")" || {
  echo "Nao foi possivel entrar na pasta da Tarefa 6."
  echo "Pressione Enter para fechar."
  read
  exit 1
}

echo "Tarefa 6 - React"
echo "Pasta: $(pwd)"
echo

if ! command -v npm >/dev/null 2>&1; then
  echo "npm nao foi encontrado. Instale o Node.js antes de executar esta tarefa."
  echo "Pressione Enter para fechar."
  read
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias..."
  npm install || {
    echo
    echo "Falha ao instalar dependencias."
    echo "Pressione Enter para fechar."
    read
    exit 1
  }
else
  echo "Dependencias ja instaladas."
fi

echo
echo "Iniciando servidor React..."
echo "Se a porta 5173 estiver ocupada, o Vite usara outra porta."
echo

npm run dev -- --host 127.0.0.1 --open || {
  echo
  echo "Falha ao iniciar o servidor."
  echo "Pressione Enter para fechar."
  read
  exit 1
}
