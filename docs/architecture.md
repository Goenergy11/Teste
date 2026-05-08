# GoPools — Arquitetura Funcional e Técnica

## 1. Objetivo do produto

A GoPools será uma plataforma web para lançar uma empresa independente especializada em piscinas no Algarve, permitindo:

- Apresentar a marca e os serviços ao mercado.
- Captar pedidos comerciais e técnicos.
- Organizar leads e seguimento comercial.
- Gerir clientes, piscinas, serviços, manutenções, assistências e orçamentos.
- Criar uma base evolutiva para CRM/ERP interno.

A primeira versão deve privilegiar clareza operacional, simplicidade de manutenção e crescimento faseado.

## 2. Princípios de arquitetura

1. **Separação clara entre website público e backoffice**
   - Website focado em confiança, serviços e conversão.
   - Backoffice focado em operação, estados e histórico.

2. **Dados antes de automações complexas**
   - O sistema deve começar por capturar dados bem estruturados.
   - Automações, integrações e relatórios avançados vêm depois.

3. **Tudo o que muda de estado deve deixar histórico**
   - Leads, pedidos, serviços, orçamentos e planos devem gerar eventos em histórico de atividade.

4. **Modelo preparado para múltiplas piscinas por cliente**
   - Essencial para moradias, alojamento local, condomínios e clientes empresariais.

5. **Upload e documentos como camada transversal**
   - Fotografias, propostas, relatórios e anexos devem poder ligar-se a várias entidades.

## 3. Stack recomendada para a fase de implementação

A stack recomendada continua a ser:

- **Frontend:** Next.js com App Router, React e TypeScript.
- **Backend:** Next.js Route Handlers ou API modular Node.js, dependendo da complexidade operacional aprovada.
- **Base de dados:** PostgreSQL.
- **ORM:** Prisma.
- **Autenticação:** Auth.js/NextAuth ou alternativa com sessões seguras, permissões e perfis.
- **Styling:** Tailwind CSS com design system próprio.
- **Storage:** S3, Cloudflare R2 ou Vercel Blob para fotografias e documentos.
- **Deploy:** Vercel para frontend/API inicial; Railway, Render ou VPS para PostgreSQL e serviços complementares.

## 4. Módulos funcionais

### 4.1 Website público

Responsável por comunicar a marca e converter visitantes em leads.

Páginas previstas:

- Homepage
- Sobre nós
- Serviços
- Página individual por serviço
- Contactos
- Landing page de captação

Funcionalidades:

- CTAs fortes para orçamento, manutenção e assistência.
- Formulários de captação.
- Conteúdo orientado a confiança técnica.
- Estrutura SEO para serviços e localidades no Algarve.

### 4.2 Captação de leads

Responsável por transformar formulários em registos comerciais.

Entradas iniciais:

- Pedido de orçamento.
- Pedido de manutenção.
- Pedido de assistência técnica.
- Contacto geral.

Regras:

- Cada submissão cria uma lead.
- A lead recebe origem, tipo de serviço, prioridade e estado inicial.
- Pedidos urgentes de assistência devem entrar com prioridade elevada.
- Fotografias devem ficar associadas à lead quando o upload for implementado.

### 4.3 Backoffice administrativo

Responsável por gerir a operação interna.

Módulos mínimos:

- Dashboard
- Leads
- Clientes
- Piscinas
- Serviços
- Manutenções
- Intervenções
- Orçamentos
- Utilizadores
- Histórico de atividade

### 4.4 CRM operacional

Responsável por acompanhar o ciclo comercial.

Pipeline sugerido para leads:

1. Nova
2. Contactado
3. Em análise
4. Orçamento enviado
5. Ganho
6. Perdido

Informação crítica:

- Responsável interno.
- Próxima ação.
- Notas.
- Histórico de contactos.
- Ligação a cliente quando a lead é ganha.
- Ligação a orçamento.

### 4.5 Operação técnica

Responsável por serviços, manutenções e assistências.

Entidades operacionais:

- Piscina
- Serviço
- Plano de manutenção
- Intervenção
- Equipamento
- Anexo
- Nota

Estados sugeridos para serviços:

1. Pedido
2. Agendado
3. Em curso
4. Concluído
5. Cancelado

## 5. Papéis e permissões

### Admin

- Acesso total.
- Gestão de utilizadores e configurações.
- Acesso a métricas e histórico.

### Gestor comercial/operacional

- Gestão de leads, clientes, orçamentos e agenda.
- Atribuição de responsáveis.

### Técnico

- Consulta de serviços atribuídos.
- Registo de intervenções, notas e fotografias.
- Atualização de estado técnico.

## 6. Fluxos principais

### 6.1 Pedido de orçamento

1. Visitante preenche formulário público.
2. Sistema cria lead com origem `Website`.
3. Backoffice mostra lead como `Nova`.
4. Gestor contacta cliente e regista nota.
5. Lead passa para `Em análise`.
6. É criado orçamento associado.
7. Orçamento é enviado.
8. Lead passa para `Orçamento enviado`.
9. Se aceite, lead passa para `Ganho` e cria/associa cliente.

### 6.2 Pedido de assistência técnica

1. Cliente/visitante submete pedido com descrição da avaria.
2. Sistema cria lead ou pedido técnico com prioridade.
3. Backoffice destaca pedidos urgentes.
4. Gestor agenda visita técnica.
5. Técnico regista intervenção, fotografias e resultado.
6. Se necessário, é criado orçamento de reparação.

### 6.3 Plano de manutenção

1. Cliente é criado ou selecionado.
2. Piscina é registada com volume, tratamento e equipamentos.
3. Plano é criado com periodicidade, valor e técnico responsável.
4. Sistema gera próxima visita.
5. Cada visita cria intervenção no histórico.

## 7. Integrações futuras

- Email transacional para confirmação de pedidos.
- WhatsApp Business para contacto rápido.
- Calendário Google/Outlook para técnicos.
- Geração de PDF para orçamentos e relatórios.
- Pagamentos/recibos numa fase ERP.
- Portal cliente para consultar histórico e pedidos.

## 8. Riscos e decisões pendentes

| Tema | Risco | Decisão necessária |
| --- | --- | --- |
| Upload de fotografias | Custos e privacidade | Escolher storage e política de retenção |
| Auth e permissões | Segurança operacional | Definir perfis reais e MFA |
| Orçamentos | Complexidade comercial | Decidir se será texto livre ou linhas de artigos |
| Manutenções | Agenda recorrente | Decidir regras de geração automática de visitas |
| Integração GoEnergy | Confusão de marca | Definir como comunicar experiência anterior sem dependência |
