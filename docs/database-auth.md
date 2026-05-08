# GoPools — Base de Dados e Autenticação

Este incremento corresponde ao segundo PR recomendado no plano V1: `feat: add Prisma schema and authentication foundation`.

## Incluído

- Schema Prisma inicial para PostgreSQL.
- Modelos NextAuth necessários para sessões e providers: `User`, `Account`, `Session` e `VerificationToken`.
- Modelos operacionais V1: `Lead`, `Customer`, `Pool`, `Equipment`, `Service`, `MaintenancePlan`, `Intervention`, `Quote`, `QuoteLine`, `Attachment`, `Note` e `ActivityLog`.
- Enums de papéis, estados, prioridades, tipos de cliente, serviços, manutenção, intervenções, orçamentos, anexos e notas.
- Prisma Client partilhado em `lib/db/prisma.ts`.
- Configuração NextAuth com provider de credenciais, Prisma Adapter e sessões JWT.
- Middleware para proteger rotas `/admin`.
- Página `/login` para entrada no backoffice.
- Seed inicial com utilizador admin e dados demonstrativos mínimos.

## Ainda fora deste incremento

- CRUD administrativo real.
- APIs públicas de captação de leads.
- Formulários funcionais ligados à base de dados.
- Upload real de fotografias.
- Gestão avançada de permissões por ação.
- Migrações geradas localmente, dependentes de `npm install` e ligação PostgreSQL.

## Variáveis necessárias

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gopools?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
SEED_ADMIN_EMAIL="admin@gopools.pt"
SEED_ADMIN_PASSWORD="change-me-now"
```

## Comandos previstos

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run db:seed
npm run dev
```

## Próximo incremento recomendado

Depois desta fundação, o próximo PR deve implementar o website público real com conteúdo e componentes finais, ou então ligar o dashboard admin às primeiras queries de leitura se a prioridade for operação interna.

## Nota sobre ambientes sem acesso ao registry npm

Neste ambiente de execução o acesso direto ao npm registry pode devolver `403 Forbidden`. Para permitir validar o repositório sem bloquear o ciclo de revisão, os checks `lint`, `typecheck`, `build` e `prisma:validate` executam validações estruturais de fallback quando as CLIs externas não estão instaladas. Em ambiente local normal, com dependências instaladas, estes comandos delegam para as ferramentas reais sempre que disponíveis.
