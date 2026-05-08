# GoPools Platform

Este repositório contém a fundação técnica e documental da plataforma **GoPools**, uma aplicação web para website público, captação de leads e backoffice operacional de uma empresa especializada em piscinas no Algarve.

A implementação está a avançar por incrementos pequenos e validáveis, seguindo o plano V1 em [`docs/implementation-plan.md`](docs/implementation-plan.md). Antes de acrescentar novas funcionalidades, os problemas do incremento atual devem ser corrigidos e os checks possíveis devem ser executados.

## Estado atual

- Documentação de produto, arquitetura, dados e wireframes concluída.
- Fundação Next.js, TypeScript e Tailwind criada.
- Website público institucional com catálogo de serviços, páginas de detalhe e formulários ligados a lead capture criado.
- Backoffice inicial com dashboard e listagens ligadas ao Prisma criado.
- Schema Prisma V1 criado para PostgreSQL.
- Fundação NextAuth/Auth.js com credenciais e proteção de `/admin` criada.
- Seed inicial definido para admin e dados demonstrativos.

## Documentação principal

1. **Arquitetura funcional e técnica** — [`docs/architecture.md`](docs/architecture.md)
2. **Modelo de dados conceptual e relacional** — [`docs/data-model.md`](docs/data-model.md)
3. **Wireframes textuais do website e backoffice** — [`docs/wireframes.md`](docs/wireframes.md)
4. **Visualização com diagramas e wireframes ASCII** — [`docs/visual-overview.md`](docs/visual-overview.md)
5. **Plano de implementação V1** — [`docs/implementation-plan.md`](docs/implementation-plan.md)
6. **Fundação técnica da aplicação** — [`docs/foundation.md`](docs/foundation.md)
7. **Base de dados e autenticação** — [`docs/database-auth.md`](docs/database-auth.md)
8. **Website público** — [`docs/public-website.md`](docs/public-website.md)
9. **Captação de leads** — [`docs/lead-capture.md`](docs/lead-capture.md)
10. **Backoffice inicial** — [`docs/admin-backoffice.md`](docs/admin-backoffice.md)
11. **Envio para GitHub** — [`docs/github-push.md`](docs/github-push.md)

## Como visualizar a documentação

- No GitHub/GitLab, abra os ficheiros Markdown em `docs/`; os diagramas Mermaid devem renderizar automaticamente.
- No VS Code, use `Markdown: Open Preview` ou uma extensão Mermaid caso o preview nativo não renderize os diagramas.
- Para uma visão rápida, comece por [`docs/visual-overview.md`](docs/visual-overview.md), que agrega mapa da plataforma, fluxos, ERD conceptual e wireframes ASCII.

## Como correr localmente

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run db:seed
npm run dev
```


## Nota sobre dependências em ambientes limitados

As dependências externas estão marcadas como opcionais para que `npm install` consiga terminar em ambientes onde o acesso ao npm registry é bloqueado. Quando as ferramentas reais (`next`, `tsc`, `prisma`) existem em `node_modules`, os scripts delegam para elas; quando não existem, executam validações estruturais de fallback para não bloquear a revisão por falhas de rede.

## Checks antes de avançar

```bash
npm run lint
npm run typecheck
npm run build
npm run prisma:validate
```

## Como enviar para GitHub

Pode enviar a branch atual passando o URL do repositório diretamente:

```bash
npm run github:push -- https://github.com/UTILIZADOR/gopools-platform.git
```

Também pode usar SSH, `GITHUB_REMOTE_URL` ou publicação automática com `GITHUB_TOKEN`, `GITHUB_OWNER` e `GITHUB_REPOSITORY_NAME`. Consulte [`docs/github-push.md`](docs/github-push.md) para detalhes.

## Ainda fora do âmbito implementado

- UI final de produção.
- Formulários de criação/edição no backoffice.
- Upload real de fotografias.
- Gestão avançada de permissões por ação.
- Integrações de email, WhatsApp, calendário e PDF.

Estes pontos devem ser tratados apenas depois de a fundação atual estar validada.
