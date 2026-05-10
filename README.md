# Assistant AI

Assistant AI é uma aplicação web de assistente de estudos construída com **Next.js**, **React**, **TypeScript**, **Prisma**, **MongoDB** e **Cohere AI**. O projeto oferece uma interface de chat para estudantes, com respostas formatadas em Markdown/LaTeX e recursos de autenticação para salvar e gerenciar conversas.

## Sumário

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura do projeto](#arquitetura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Como executar](#como-executar)
- [Scripts disponíveis](#scripts-disponíveis)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Banco de dados](#banco-de-dados)
- [Rotas da aplicação](#rotas-da-aplicação)
- [API](#api)
- [Fluxo de autenticação](#fluxo-de-autenticação)
- [Integração com IA](#integração-com-ia)
- [Estilo e componentes](#estilo-e-componentes)
- [Solução de problemas](#solução-de-problemas)
- [Boas práticas para contribuição](#boas-práticas-para-contribuição)

## Visão geral

O Assistant AI funciona como um ambiente de apoio aos estudos. Usuários podem:

1. Conversar com um assistente educativo.
2. Escolher o tipo de resposta desejada: explicação, resumo, questões ou dúvida.
3. Criar uma conta para persistir chats no banco de dados.
4. Criar, renomear, fixar e excluir conversas.
5. Atualizar dados da conta ou excluir o perfil.

A aplicação também permite uso anônimo para iniciar conversas sem autenticação, porém o histórico persistente depende de login.

## Funcionalidades

### Chat de estudos

- Envio de mensagens para um modelo de IA via Cohere.
- Histórico recente enviado como contexto para melhorar a continuidade da conversa.
- Respostas renderizadas com Markdown.
- Suporte a expressões matemáticas em LaTeX.
- Modos de resposta:
  - **Explicação**: explica o conteúdo de forma simples e com exemplos.
  - **Resumo**: gera um resumo objetivo do tópico informado.
  - **Questões**: cria questões de múltipla escolha sobre o assunto.
  - **Dúvida**: responde dúvidas relacionadas a estudos.

### Autenticação e conta

- Cadastro de usuário.
- Login com `userName` e senha.
- Logout.
- Sessão por cookie HTTP-only com JWT.
- Hash de senha com `bcryptjs`.
- Atualização de nome, nome de usuário e senha.
- Exclusão de conta mediante confirmação de senha.

### Gerenciamento de conversas

- Criação de chats por usuário autenticado.
- Listagem de chats ordenada por fixados e data de criação.
- Renomeação de chat.
- Fixar/desfixar chat.
- Excluir chat individual.
- Excluir todos os chats do usuário.
- Excluir mensagens individuais.

## Tecnologias

- **Next.js 16** com App Router.
- **React 19**.
- **TypeScript**.
- **Prisma 6** com MongoDB.
- **Cohere AI** para geração de respostas.
- **Tailwind CSS 4** para estilos.
- **shadcn/radix-ui** e componentes utilitários de UI.
- **next-themes** para tema.
- **sonner** para notificações.
- **jsonwebtoken** para autenticação JWT.
- **bcryptjs** para hash e validação de senhas.
- **react-markdown**, **remark-math** e **rehype-katex** para renderização de Markdown e matemática.

## Arquitetura do projeto

```text
.
├── prisma/
│   └── schema.prisma          # Modelos User, Chat e Message para MongoDB
├── public/                    # Assets estáticos
├── src/
│   ├── app/                   # Rotas, páginas e APIs do Next.js App Router
│   │   ├── api/               # Route handlers da API
│   │   ├── screens/           # Telas principais da aplicação
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout raiz
│   │   └── page.tsx           # Redirecionamento inicial para o chat
│   ├── components/            # Componentes de layout, módulos e UI
│   ├── context/               # Contextos React, incluindo autenticação
│   ├── hooks/                 # Hooks reutilizáveis
│   ├── lib/                   # Clientes e utilitários de infraestrutura
│   ├── services/              # Camada de acesso a dados e regras de serviço
│   ├── types/                 # Tipagens compartilhadas
│   └── utils/                 # Helpers de API, JWT, Markdown e resposta HTTP
├── package.json
├── next.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

## Pré-requisitos

Antes de executar o projeto, instale/configure:

- **Node.js** compatível com Next.js 16.
- **npm**.
- Uma instância **MongoDB** acessível.
- Uma chave de API da **Cohere**.

> Dica: confira a versão local com `node -v` e `npm -v`.

## Configuração do ambiente

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd Assistant-AI
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Caso o projeto ainda não tenha `.env.example`, crie manualmente um `.env` com as variáveis descritas abaixo.

4. Gere o Prisma Client:

```bash
npx prisma generate
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

6. Acesse a aplicação em:

```text
http://localhost:3000
```

## Como executar

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Executar build de produção

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js. |
| `npm run build` | Gera o build de produção. |
| `npm run start` | Executa a aplicação a partir do build gerado. |
| `npm run lint` | Executa o ESLint no projeto. |

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/assistant-ai?retryWrites=true&w=majority"
JWT_SECRET="uma-chave-secreta-forte"
CO_API_KEY="sua-chave-da-cohere"
UPSTASH_REDIS_REST_URL="sua-chave-do-redis"
UPSTASH_REDIS_REST_TOKEN="seu-token-do-redis"
```

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `DATABASE_URL` | Sim | String de conexão do MongoDB usada pelo Prisma. |
| `JWT_SECRET` | Sim | Chave usada para assinar e validar tokens JWT. |
| `CO_API_KEY` | Sim | Token da Cohere usado para enviar mensagens ao modelo de IA. |
| `UPSTASH_REDIS_REST_URL` | Sim | URL do Redis usado para controle de limite de mensagens. |
| `UPSTASH_REDIS_REST_TOKEN` | Sim | Token do Redis usado para controle de limite de mensagens.  |

> Nunca versione arquivos `.env` com segredos reais.

## Banco de dados

O projeto usa **Prisma** com provider **MongoDB**. O schema define três modelos principais:

### `User`

Representa o usuário autenticado.

Campos principais:

- `id`: identificador MongoDB.
- `name`: nome exibido na interface.
- `userName`: identificador único para login.
- `password`: senha criptografada.
- `createdAt`: data de criação.
- `chats`: relação com conversas do usuário.

### `Chat`

Representa uma conversa salva.

Campos principais:

- `id`: identificador MongoDB.
- `title`: título opcional do chat.
- `fixed`: indica se o chat está fixado.
- `createdAt`: data de criação.
- `userId`: usuário dono do chat.
- `messages`: mensagens associadas.

### `Message`

Representa mensagens de uma conversa.

Campos principais:

- `id`: identificador MongoDB.
- `content`: conteúdo textual da mensagem.
- `role`: papel da mensagem (`user` ou `assistant`).
- `createdAt`: data de criação.
- `chatId`: chat ao qual a mensagem pertence.

### Comandos úteis do Prisma

```bash
npx prisma generate
```

Gera ou atualiza o Prisma Client.

```bash
npx prisma studio
```

Abre uma interface visual para explorar os dados.

> Como o datasource é MongoDB, fluxos de migração relacional como `prisma migrate` podem não ser aplicáveis da mesma forma que em bancos SQL.

## Rotas da aplicação

| Rota | Descrição |
| --- | --- |
| `/` | Redireciona para a tela principal do chat. |
| `/screens/home/[chatId]` | Tela do chat. Usa `null` para conversa anônima/sem chat selecionado. |
| `/screens/settings` | Tela de configurações do usuário autenticado. |

## API

As rotas da API seguem o padrão do App Router em `src/app/api`.

### Autenticação

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Cadastra usuário, cria JWT e define cookie de sessão. |
| `POST` | `/api/auth/login` | Autentica usuário, cria JWT e define cookie de sessão. |
| `POST` | `/api/auth/logout` | Remove o cookie de sessão. |

### Usuário

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/api/private/me` | Retorna dados do usuário autenticado. |
| `GET` | `/api/private/usage` | Busca o uso do limite de mensagens do usuário ou guest (anônimo) |
| `PUT` | `/api/private/user` | Atualiza dados do usuário e/ou senha. |
| `DELETE` | `/api/private/user` | Exclui a conta do usuário autenticado. |

### Chats

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/api/private/chat` | Lista chats do usuário autenticado. |
| `POST` | `/api/private/chat` | Cria um novo chat. |
| `PUT` | `/api/private/chat/[id]/edit` | Renomeia um chat. |
| `PATCH` | `/api/private/chat/[id]/pin` | Alterna o estado fixado/desfixado. |
| `DELETE` | `/api/private/chat/[id]/delete` | Exclui um chat. |
| `DELETE` | `/api/private/chat/delete-all` | Exclui todos os chats do usuário autenticado. |

### Mensagens

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/api/private/message?chatId=<id>` | Lista mensagens de um chat. |
| `POST` | `/api/private/message` | Envia mensagem para a IA e salva no chat se houver usuário autenticado. |
| `DELETE` | `/api/private/message/[id]/delete` | Exclui uma mensagem. |

Exemplo de corpo para envio de mensagem:

```json
{
  "message": "Explique a segunda lei de Newton",
  "history": [],
  "type": "explicacao",
  "chatId": "<id-do-chat-ou-null>"
}
```

Valores aceitos em `type`:

- `explicacao`
- `resumo`
- `questao`
- `duvida`

## Fluxo de autenticação

1. O usuário se cadastra ou faz login.
2. A API valida as credenciais.
3. Um JWT é gerado com `JWT_SECRET`.
4. O token é salvo em cookie `httpOnly` com duração de 1 dia.
5. Rotas privadas leem o cookie e validam o token antes de executar ações.
6. O logout remove o cookie.

## Integração com IA

A integração com a Cohere está centralizada em `src/lib/cohere.ts`.

O assistente recebe um preâmbulo em português com regras de comportamento e formatação:

- Atuar como assistente educativo.
- Escrever equações em LaTeX.
- Usar Markdown para tabelas.
- Mostrar cálculos passo a passo.
- Limitar respostas a até 500 palavras.
- Adaptar a resposta ao modo selecionado pelo usuário.

O histórico enviado à IA é limitado às últimas 10 mensagens para manter contexto sem crescer indefinidamente.

## Estilo e componentes

A interface é baseada em:

- Tailwind CSS.
- Componentes em `src/components/ui`.
- Componentes de domínio em `src/components/modules`.
- Layout global com sidebar e estrutura centralizada.
- Notificações com `sonner`.
- Tema com `next-themes`.

## Solução de problemas

### `DATABASE_URL` não configurada

Verifique se o arquivo `.env` existe e se a variável `DATABASE_URL` aponta para uma instância MongoDB válida.

### Erro de autenticação/JWT

Confirme se `JWT_SECRET` está definido. Se você alterar essa chave, sessões antigas deixarão de ser válidas.

### Respostas da IA não são geradas

Verifique:

- Se `CO_API_KEY` está configurada corretamente.
- Se a chave da Cohere está ativa.
- Se há conectividade com a API da Cohere.
- Se o modelo configurado está disponível para a sua conta.

### Prisma Client desatualizado

Execute novamente:

```bash
npx prisma generate
```

### Porta 3000 ocupada

Execute em outra porta:

```bash
npm run dev -- -p 3001
```

## Boas práticas para contribuição

1. Crie uma branch para sua alteração.
2. Mantenha componentes pequenos e reutilizáveis.
3. Preserve as tipagens em TypeScript.
4. Rode lint antes de abrir uma PR:

```bash
npm run lint
```

5. Para mudanças no schema do Prisma, atualize a documentação e gere novamente o client:

```bash
npx prisma generate
```

## Licença

Este projeto não declara uma licença no repositório. Antes de redistribuir ou reutilizar o código publicamente, adicione uma licença adequada ou confirme as permissões com os mantenedores.
