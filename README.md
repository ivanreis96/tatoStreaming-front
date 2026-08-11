# Tato Streaming - Frontend

Aplicação web do ecossistema Tato Streaming, construída com React + Vite + TypeScript.

## Visão Geral

Este repositório representa a camada de interface (UI) e já está integrado com a API para os fluxos principais de autenticação e catálogo.

Relações no workspace:
- `../back/tatoStreaming-back`: API NestJS.
- `../shared`: contratos (schemas e tipos) compartilhados.

## Stack

- React 19
- Vite 8
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS

## Mapa de Implementação (status real)

### Fase 1 - Base do app

- Concluído: shell com `Header`, `Footer`, `main` e roteamento principal.
- Concluído: tema claro/escuro com persistência em `localStorage` (`app-theme`).
- Concluído: store Redux com slices de `theme` e `auth`.

### Fase 2 - Autenticação

- Concluído: telas de login e cadastro com validação e integração com API.
- Concluído: persistência de sessão em `localStorage` (`app-auth-session`).
- Concluído: rotas protegidas (`/` e `/movie/:id`) e rotas públicas condicionais (`/login`, `/cadastro`).
- Parcial: existe endpoint de refresh no backend, mas o front ainda não faz renovação automática do token via interceptor/fila de retry.

### Fase 3 - Catálogo e Home

- Concluído: listagem da home via API com fallback para mock (`mediaGateway`).
- Concluído: busca por título, filtros (data, duração, gêneros) e paginação.
- Concluído: formulário de adicionar filme (sheet lateral) com validação Zod antes do envio.
- Concluído: opção de rodar 100% em mock via variável de ambiente.

### Fase 4 - Detalhe de filme

- Concluído: página de detalhe (`/movie/:id`) com carregamento por id.
- Concluído: exibição de trailer com embed de YouTube (`YouTubeEmbed`).
- Concluído: tracker circular para rating (`CircularTracker`).
- Concluído: botão **Deletar** com confirmação e chamada de `DELETE /api/media/:id`.
- Concluído: botão **Editar** com sheet lateral e o mesmo formulário padrão de AddMovie (`AddMovieContent`), salvando via `PATCH /api/media/:id`.

### Fase 5 - Qualidade e hardening

- Parcial: base de testes automatizados de interface implementada (unit/integration/e2e).
- Pendente: estratégia automática de refresh token no front.

## Requisitos

- Node.js 20+
- npm 10+

## Setup Local

### 1) Build do pacote shared

```bash
cd ../shared
npm install
npm run build
```

### 2) Instalar dependências do front

```bash
cd ../front/tatoStreaming-front
npm install
```

### 3) Variáveis de ambiente

Crie `.env.local` em `front/tatoStreaming-front`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK_MEDIA=false
VITE_USE_MOCK_MEDIA_FALLBACK=true
```

Notas:
- O backend usa prefixo global `/api`.
- `VITE_USE_MOCK_MEDIA=true` força catálogo em mock.
- `VITE_USE_MOCK_MEDIA_FALLBACK=true` usa mock só quando a API falhar.

### 4) Rodar o front

```bash
npm run dev
```

URL padrão: `http://localhost:5173`.

## Scripts

- `npm run dev`: desenvolvimento.
- `npm run build`: build de produção.
- `npm run preview`: preview do build.
- `npm run lint`: lint do projeto.
- `npm run test`: executa testes unitários e de integração (Jest).
- `npm run test:e2e`: executa testes end-to-end (Playwright).

## Testes

### Stack de testes

- Unitário e integração: Jest + ts-jest.
- E2E: Playwright.

### Executar testes

Unitário/integracao:

```bash
npm run test
```

E2E (Playwright):

```bash
npm run test:e2e
```

Observação para E2E:

- Se for a primeira execução do Playwright no ambiente, instale os navegadores:

```bash
npx playwright install
```

### Cobertura atual implementada

- Rotas protegidas e rotas públicas condicionais (integração).
- Mapeamento e validação de dados do formulário de adicionar filme (unitário).
- Fallback do gateway de mídia para mock em falha da API (integração).
- Redirecionamento de visitante para login em fluxo real de navegação (e2e smoke).

## Ordem recomendada no workspace

1. `shared` (build)
2. `back` (API + banco)
3. `front` (UI)
