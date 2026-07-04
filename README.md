# Tato Streaming - Frontend

Aplicação web do projeto Tato Streaming, construída com React + Vite + TypeScript.

## Contexto do Projeto

Este repositório representa a camada de interface (UI) da aplicação. Hoje, parte do fluxo ainda usa dados mockados para acelerar desenvolvimento de telas e experiência.

No workspace maior, este frontend se relaciona com:

- `../back/tatoStreaming-back`: API NestJS com autenticação, usuários e mídias.
- `../shared`: pacote compartilhado para contratos e schemas (tipos e validações).

Mesmo quando algum fluxo está mockado no front, a estrutura já está preparada para consumo de API via `src/shared/api/httpClient.ts` e URL base em `src/shared/config/env.ts`.

## Stack

- React 19
- Vite 8
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS

## Requisitos

- Node.js 20+ (recomendado)
- npm 10+ (recomendado)

## Setup Passo a Passo

### 1) Build do pacote shared (obrigatório para workspace local)

Este projeto declara dependência local para `@tato-streaming/shared` usando `file:../shared`.

No terminal, a partir da pasta raiz do workspace (`tato-streaming`):

```bash
cd shared
npm install
npm run build
```

### 2) Instalar dependências do front

```bash
cd ../front/tatoStreaming-front
npm install
```

### 3) Configurar variável de ambiente (opcional, mas recomendado)

Crie um arquivo `.env.local` em `tatoStreaming-front`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Observação:

- Se não configurar, o projeto usa `http://localhost:3000` por padrão.
- O backend usa prefixo global `/api`, então as chamadas do front devem considerar esse prefixo no caminho da requisição.

### 4) Rodar em modo desenvolvimento

```bash
npm run dev
```

Aplicação disponível em: `http://localhost:5173` (porta padrão do Vite).

## Scripts Principais

- `npm run dev`: sobe servidor de desenvolvimento.
- `npm run build`: gera build de produção.
- `npm run preview`: serve build localmente.
- `npm run lint`: executa lint.

## Integração com as Outras Partes

- Frontend consome a API do backend para fluxos de autenticação e mídias.
- Contratos compartilhados podem ser centralizados no pacote `shared` para evitar divergência de tipos/validações entre front e back.
- Em desenvolvimento, é comum iniciar nesta ordem:
  1. `shared` (build)
  2. `back` (API)
  3. `front` (UI)

## Status Atual

- Rotas principais: `/`, `/login`, `/cadastro`.
- Existe inicialização de autenticação mock no provider.
- Lista de filmes da home ainda está conectada a dados mockados.

Isso facilita evoluir UI/UX enquanto a integração backend é expandida gradualmente.
