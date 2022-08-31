# Setup

1. Criar o projeto NPM: `npm init -y`
2. Instalar o cliente firebase: `npm install -D firebase-tools`
3. Realizar login na conta Google: `npx firebase login`
4. Inicializar projeto Firebase: `npx firebase init`
   - Selecionar opções: Hosting, Realtime Database, Emulators e Storage
   - Criar novo projeto
   - Inicializar Realtime Database
   - Caso haja algum erro durante a inicialização do projeto basta repetir o comando selecionando as mesmas opções, e ao invés de criar um novo projeto utilizar o projeto criado anteriormente.
   - Em alguns casos é necessário acessar o console do projeto no navegador https://console.firebase.google.com/ para definir as configurações de alguns serviços (ex. Storage)
5. Criar projeto Vite/React: `npm create vite@latest marketplace-react`
   - Selecionar react e react-ts
   - Seguir instruções mostradas na execução
