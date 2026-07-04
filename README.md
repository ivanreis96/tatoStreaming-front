# Tato Streaming - Frontend

Aplicacao web do projeto Tato Streaming, construida com React + Vite + TypeScript.

## Contexto do Projeto

Este repositorio representa a camada de interface (UI) da aplicacao. Hoje, parte do fluxo ainda usa dados mockados para acelerar desenvolvimento de telas e experiencia.

No workspace maior, este frontend se relaciona com:

- `../back/tatoStreaming-back`: API NestJS com autenticacao, usuarios e midias.
- `../shared`: pacote compartilhado para contratos e schemas (tipos e validacoes).

Mesmo quando algum fluxo esta mockado no front, a estrutura ja esta preparada para consumo de API via `src/shared/api/httpClient.ts` e URL base em `src/shared/config/env.ts`.

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

### 1) Build do pacote shared (obrigatorio para workspace local)

Este projeto declara dependencia local para `@tato-streaming/shared` usando `file:../shared`.

No terminal, a partir da pasta raiz do workspace (`tato-streaming`):

```bash
cd shared
npm install
npm run build
```

### 2) Instalar dependencias do front

```bash
cd ../front/tatoStreaming-front
npm install
```

### 3) Configurar variavel de ambiente (opcional, mas recomendado)

Crie um arquivo `.env.local` em `tatoStreaming-front`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Observacao:

- Se nao configurar, o projeto usa `http://localhost:3000` por padrao.
- O backend usa prefixo global `/api`, entao as chamadas do front devem considerar esse prefixo no caminho da requisicao.

### 4) Rodar em modo desenvolvimento

```bash
npm run dev
```

Aplicacao disponivel em: `http://localhost:5173` (porta padrao do Vite).

## Scripts Principais

- `npm run dev`: sobe servidor de desenvolvimento.
- `npm run build`: gera build de producao.
- `npm run preview`: serve build localmente.
- `npm run lint`: executa lint.

## Integracao com as Outras Partes

- Frontend consome a API do backend para fluxos de autenticacao e midias.
- Contratos compartilhados podem ser centralizados no pacote `shared` para evitar divergencia de tipos/validacoes entre front e back.
- Em desenvolvimento, e comum iniciar nesta ordem:
  1. `shared` (build)
  2. `back` (API)
  3. `front` (UI)

## Status Atual

- Rotas principais: `/`, `/login`, `/cadastro`.
- Existe inicializacao de autenticacao mock no provider.
- Lista de filmes da home ainda esta conectada a dados mockados.

Isso facilita evoluir UI/UX enquanto a integracao backend e expandida gradualmente.
