# GoPools — Plano de Implementação V1

Este documento transforma a fase de arquitetura e wireframes num plano executável para a primeira versão funcional da plataforma GoPools.

A estratégia é implementar por incrementos pequenos, validáveis e com dependências claras, evitando construir CRM/ERP completo antes de confirmar os fluxos reais da operação.

## 1. Objetivo da V1

A V1 deve permitir que a GoPools:

- Apresente a marca e os serviços ao mercado.
- Capte leads através de formulários públicos.
- Registe pedidos de orçamento, manutenção e assistência técnica.
- Consulte e acompanhe leads num backoffice protegido.
- Registe clientes e piscinas.
- Crie serviços, planos de manutenção e orçamentos simples.
- Mantenha histórico básico de atividade.

## 2. Decisões assumidas para avançar

Para não bloquear a implementação, ficam assumidas as seguintes decisões de V1:

| Tema | Decisão V1 | Justificação |
| --- | --- | --- |
| Stack | Next.js, React, TypeScript, PostgreSQL, Prisma, Tailwind | Stack simples, moderna e alinhada com a arquitetura aprovada |
| Autenticação | Auth.js/NextAuth ou equivalente com credenciais e sessões seguras | Evita autenticação caseira e prepara permissões futuras |
| Permissões | Admin e Gestor na V1; Técnico pode ser papel previsto, mas não precisa de vista dedicada completa | Reduz escopo inicial sem fechar evolução operacional |
| Orçamentos | Orçamento simples com descrição, valor estimado, estado e notas | Permite operação comercial rápida antes de linhas detalhadas |
| QuoteLine | Modelo preparado, UI pode ficar fora da V1 inicial | Evita bloquear por complexidade de artigos/IVA/descontos |
| Upload | Preparar modelo e interface; storage real pode entrar como subfase V1.1 | Fotografias são importantes, mas integração de storage pode ser isolada |
| Anexos | Associação por `entityType` + `entityId` na V1 | Mais flexível para MVP; pode evoluir para relações específicas se necessário |
| Manutenções recorrentes | Registar `nextVisitAt`; geração automática de visitas fica para fase posterior | Menos risco e mais controlo operacional inicial |
| Emails/WhatsApp | Fora da V1; preparar eventos e dados para integração futura | Primeiro validar operação manual |
| Portal cliente | Fora da V1 | Backoffice interno tem maior prioridade |

## 3. Fases de implementação

## Fase 1 — Fundação técnica

### Objetivo

Criar a base técnica limpa para desenvolvimento contínuo.

### Entregáveis

- Projeto Next.js com App Router.
- TypeScript configurado.
- Tailwind CSS configurado.
- ESLint/Prettier ou regras equivalentes.
- Estrutura de pastas inicial.
- Variáveis de ambiente documentadas.
- Layout base público e administrativo.
- Design tokens iniciais da GoPools.

### Estrutura de pastas proposta

```txt
app/
  (public)/
    page.tsx
    sobre/
    servicos/
    contactos/
    pedir-orcamento/
  admin/
    page.tsx
    leads/
    clientes/
    piscinas/
    servicos/
    manutencoes/
    orcamentos/
  api/
    leads/
    maintenance-requests/
    support-requests/
components/
  public/
  admin/
  forms/
  ui/
lib/
  auth/
  db/
  validation/
  constants/
  services/
prisma/
  schema.prisma
  migrations/
docs/
```

### Critérios de aceitação

- Aplicação arranca localmente.
- Layout base público renderiza.
- Layout admin existe, mesmo sem dados reais.
- Comandos de lint/build passam no ambiente local.

## Fase 2 — Base de dados e autenticação

### Objetivo

Criar persistência, autenticação e proteção do backoffice.

### Entregáveis

- Schema Prisma inicial.
- Migration inicial.
- Prisma Client configurado.
- Seed com utilizador admin e dados demonstrativos mínimos.
- Autenticação configurada.
- Proteção das rotas `/admin`.
- Papéis `ADMIN`, `MANAGER`, `TECHNICIAN` no modelo, mesmo que a UI inicial use apenas admin/gestor.

### Tabelas V1 obrigatórias

- User
- Lead
- Customer
- Pool
- Equipment
- Service
- MaintenancePlan
- Intervention
- Quote
- Attachment
- Note
- ActivityLog

### Critérios de aceitação

- Migration corre numa base PostgreSQL limpa.
- Admin consegue iniciar sessão.
- Utilizador não autenticado não acede ao backoffice.
- Seed cria dados suficientes para visualizar dashboard e listagens.

## Fase 3 — Website público e branding base

### Objetivo

Criar presença institucional e páginas orientadas à conversão.

### Entregáveis

- Homepage.
- Sobre nós.
- Serviços.
- Página individual por serviço.
- Contactos.
- Landing page de pedido de orçamento.
- Header e footer responsivos.
- Cards de serviços.
- CTAs consistentes.
- SEO básico por página.

### Conteúdo inicial

Serviços mínimos:

- Construção de piscinas.
- Remodelação de piscinas.
- Manutenção de piscinas.
- Assistência técnica.
- Tratamento de água.
- Equipamentos e eficiência energética.

### Critérios de aceitação

- Website é responsivo.
- Cada página tem CTA claro.
- Serviços têm páginas individuais.
- Design comunica modernidade, confiança técnica e ligação ao Algarve.

## Fase 4 — Formulários e criação de leads

### Objetivo

Transformar pedidos públicos em leads no backoffice.

### Entregáveis

- Formulário de pedido de orçamento.
- Formulário de pedido de manutenção.
- Formulário de pedido de assistência técnica.
- Validação client/server.
- API routes para submissão.
- Criação automática de Lead.
- Criação de ActivityLog inicial.
- Feedback de sucesso/erro.
- Honeypot ou proteção anti-spam simples.

### Regras de negócio

- Pedido de orçamento cria lead com prioridade normal.
- Pedido de manutenção cria lead com tipo `Manutenção`.
- Pedido de assistência cria lead com prioridade baseada no grau de urgência.
- Toda lead começa em estado `Nova`.
- Toda submissão guarda origem.

### Critérios de aceitação

- Submissão válida aparece no backoffice.
- Submissão inválida devolve erros claros.
- Lead inclui origem, serviço, estado, prioridade e mensagem.
- ActivityLog regista criação da lead.

## Fase 5 — Backoffice de leads e dashboard

### Objetivo

Permitir gestão comercial inicial.

### Entregáveis

- Dashboard com métricas:
  - Leads novas.
  - Leads em aberto.
  - Pedidos urgentes.
  - Clientes ativos.
  - Serviços agendados.
  - Orçamentos pendentes.
- Listagem de leads.
- Filtros por estado, prioridade, serviço e data.
- Detalhe de lead.
- Alteração de estado.
- Atribuição de responsável.
- Notas internas.
- Histórico de atividade.

### Critérios de aceitação

- Gestor consegue ver e priorizar leads novas.
- Gestor consegue alterar estado e adicionar nota.
- Mudanças críticas criam ActivityLog.
- Dashboard reflete dados reais da base.

## Fase 6 — Clientes, piscinas e serviços

### Objetivo

Começar a organizar a operação técnica.

### Entregáveis

- CRUD de clientes.
- CRUD de piscinas associadas a clientes.
- Registo de equipamentos por piscina.
- CRUD de serviços.
- Associação de serviço a cliente e piscina.
- Estados de serviço.
- Datas previstas.
- Responsável interno.

### Critérios de aceitação

- Cliente pode ter múltiplas piscinas.
- Piscina pode ter múltiplos equipamentos.
- Serviço pode ser agendado e concluído.
- Histórico fica disponível no detalhe do cliente/piscina.

## Fase 7 — Manutenções, intervenções e orçamentos simples

### Objetivo

Criar base operacional recorrente e comercial.

### Entregáveis

- Planos de manutenção.
- Próxima visita (`nextVisitAt`).
- Intervenções associadas a serviço ou plano.
- Orçamentos simples.
- Estados de orçamento.
- Ligação entre lead e orçamento.
- Ligação entre cliente e orçamento.

### Critérios de aceitação

- Plano de manutenção fica associado a cliente e piscina.
- Intervenção pode ser registada com resumo técnico.
- Orçamento pode ser criado, enviado, aceite, recusado ou cancelado.
- Lead ganha pode ser associada a cliente.

## Fase 8 — Preparação de deploy

### Objetivo

Deixar a V1 pronta para demonstração e validação real.

### Entregáveis

- Variáveis de ambiente completas.
- Instruções de deploy.
- Checklist de produção.
- Seed/demo opcional.
- Configuração de base de dados gerida.
- Política inicial de backups.

### Critérios de aceitação

- Aplicação corre em ambiente de staging.
- Base de dados está persistente.
- Login admin funciona em staging.
- Formulários públicos criam leads em staging.

## 4. Backlog priorizado

### P0 — Essencial para V1

- Setup Next.js/TypeScript/Tailwind.
- Prisma/PostgreSQL.
- Auth e proteção admin.
- Schema inicial.
- Website público mínimo.
- Formulários públicos.
- Criação de leads.
- Dashboard.
- Gestão de leads.
- Clientes e piscinas.
- Serviços.
- Orçamentos simples.
- ActivityLog.

### P1 — Importante após V1 funcional

- Upload real de fotografias.
- Gestão de equipamentos mais detalhada.
- Intervenções com parâmetros de água.
- Filtros avançados.
- Pesquisa global.
- Geração de PDF de orçamento.
- Emails transacionais.

### P2 — Evolução CRM/ERP

- Portal cliente.
- Agenda avançada de técnicos.
- Recorrência automática de visitas.
- WhatsApp Business.
- Faturação/recibos.
- Gestão de stock/artigos.
- Relatórios financeiros e operacionais.

## 5. Critérios globais de qualidade

- Código TypeScript em modo estrito.
- Validação server-side em todos os formulários.
- Componentes reutilizáveis.
- Separação clara entre UI, dados, validação e regras de negócio.
- Rotas administrativas protegidas.
- Erros tratados com mensagens úteis.
- Estados visuais claros.
- Tabelas responsivas ou alternativa em cards no mobile.
- Registo em ActivityLog para alterações importantes.
- Sem hardcode de credenciais ou URLs sensíveis.

## 6. Testes mínimos por fase

### Fundação

- Build.
- Lint.
- Typecheck.

### Base de dados

- Migration numa base limpa.
- Seed.
- Teste de ligação ao banco.

### Formulários

- Submissão válida.
- Submissão inválida.
- Anti-spam básico.
- Criação de ActivityLog.

### Backoffice

- Acesso bloqueado sem login.
- Login válido.
- Listagens carregam.
- Alterações de estado persistem.

### Regressão manual

- Navegação pública desktop/mobile.
- Formulários em mobile.
- Dashboard admin.
- Detalhes de lead/cliente/piscina.

## 7. Ordem recomendada dos próximos PRs

1. `chore: scaffold Next.js application`
2. `feat: add Prisma schema and authentication foundation`
3. `feat: implement public website pages`
4. `feat: add lead capture forms and APIs`
5. `feat: add admin dashboard and lead management`
6. `feat: add customers pools and services management`
7. `feat: add maintenance plans interventions and simple quotes`
8. `chore: prepare staging deployment`

## 8. Definição de pronto para começar a codar

A implementação pode começar quando:

- Este plano for aceite.
- As decisões assumidas na secção 2 forem aceites ou ajustadas.
- O MVP da V1 for confirmado.
- O ambiente de destino para base de dados/staging for escolhido.

