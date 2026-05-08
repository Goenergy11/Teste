# GoPools — Visualização da Arquitetura e Wireframes

Este documento permite visualizar a proposta sem implementar código de aplicação. Os diagramas usam Mermaid, suportado nativamente pelo GitHub e por extensões comuns de preview Markdown no VS Code.

## 1. Mapa visual da plataforma

```mermaid
flowchart TB
  subgraph Public[Website público]
    Home[Homepage]
    About[Sobre nós]
    Services[Serviços]
    ServiceDetail[Página individual de serviço]
    Contacts[Contactos]
    Landing[Landing page de captação]
  end

  subgraph Capture[Captação]
    QuoteForm[Pedido de orçamento]
    MaintenanceForm[Pedido de manutenção]
    SupportForm[Pedido de assistência técnica]
    GeneralContact[Contacto geral]
  end

  subgraph Backoffice[Backoffice GoPools]
    Dashboard[Dashboard]
    Leads[Gestão de leads]
    Customers[Gestão de clientes]
    Pools[Gestão de piscinas]
    ServicesAdmin[Gestão de serviços]
    Maintenance[Gestão de manutenções]
    Interventions[Intervenções]
    Quotes[Orçamentos]
    Activity[Histórico de atividade]
  end

  Home --> QuoteForm
  Services --> ServiceDetail
  ServiceDetail --> QuoteForm
  Contacts --> GeneralContact
  Landing --> QuoteForm
  Landing --> MaintenanceForm
  Landing --> SupportForm

  QuoteForm --> Leads
  MaintenanceForm --> Leads
  SupportForm --> Leads
  GeneralContact --> Leads

  Leads --> Quotes
  Leads --> Customers
  Customers --> Pools
  Pools --> ServicesAdmin
  Pools --> Maintenance
  ServicesAdmin --> Interventions
  Maintenance --> Interventions
  Leads --> Activity
  Quotes --> Activity
  ServicesAdmin --> Activity
  Interventions --> Activity
  Dashboard --> Leads
  Dashboard --> ServicesAdmin
  Dashboard --> Maintenance
  Dashboard --> Quotes
```

## 2. Fluxo comercial visual

```mermaid
stateDiagram-v2
  [*] --> Nova: formulário submetido
  Nova --> Contactado: equipa contacta lead
  Contactado --> EmAnalise: necessidade validada
  EmAnalise --> OrcamentoEnviado: proposta enviada
  OrcamentoEnviado --> Ganho: cliente aceita
  OrcamentoEnviado --> Perdido: cliente recusa/não avança
  EmAnalise --> Perdido: sem enquadramento
  Ganho --> ClienteCriado: criar/associar cliente
  ClienteCriado --> [*]
  Perdido --> [*]
```

## 3. Fluxo de assistência técnica

```mermaid
flowchart LR
  A[Pedido de assistência] --> B{Urgência?}
  B -->|Baixa/Normal| C[Lead prioridade normal]
  B -->|Alta| D[Lead prioridade alta]
  B -->|Urgente| E[Destaque no dashboard]
  C --> F[Triagem técnica]
  D --> F
  E --> F
  F --> G[Agendar visita]
  G --> H[Intervenção técnica]
  H --> I{Resolvido?}
  I -->|Sim| J[Concluir intervenção]
  I -->|Não| K[Criar orçamento/reparação]
  J --> L[Histórico atualizado]
  K --> L
```

## 4. ERD conceptual simplificado

```mermaid
erDiagram
  USER ||--o{ LEAD : owns
  USER ||--o{ SERVICE : responsible_for
  USER ||--o{ INTERVENTION : performs
  USER ||--o{ NOTE : writes
  USER ||--o{ ACTIVITY_LOG : creates

  LEAD ||--o{ QUOTE : originates
  LEAD ||--o{ NOTE : has
  LEAD ||--o{ ATTACHMENT : has
  LEAD ||--o{ ACTIVITY_LOG : logs
  LEAD }o--|| CUSTOMER : converts_to

  CUSTOMER ||--o{ POOL : owns
  CUSTOMER ||--o{ SERVICE : requests
  CUSTOMER ||--o{ MAINTENANCE_PLAN : subscribes
  CUSTOMER ||--o{ QUOTE : receives

  POOL ||--o{ EQUIPMENT : contains
  POOL ||--o{ SERVICE : receives
  POOL ||--o{ MAINTENANCE_PLAN : has
  POOL ||--o{ INTERVENTION : records
  POOL ||--o{ ATTACHMENT : has

  MAINTENANCE_PLAN ||--o{ INTERVENTION : generates
  SERVICE ||--o{ INTERVENTION : includes
  SERVICE ||--o{ ATTACHMENT : has
  QUOTE ||--o{ QUOTE_LINE : contains
```

## 5. Wireframe visual textual — Homepage

```txt
┌─────────────────────────────────────────────────────────────────────┐
│ LOGO GoPools      Início  Sobre  Serviços  Orçamento  Contactos     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Piscinas técnicas, eficientes e preparadas para o Algarve           │
│  Construção, remodelação, manutenção e assistência técnica.          │
│                                                                     │
│  [Pedir orçamento]   [Ver serviços]        [Imagem/hero piscina]     │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  Serviços principais                                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                       │
│  │Construção  │ │Remodelação │ │Manutenção  │                       │
│  └────────────┘ └────────────┘ └────────────┘                       │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                       │
│  │Assistência │ │Trat. água  │ │Equipamentos│                       │
│  └────────────┘ └────────────┘ └────────────┘                       │
├─────────────────────────────────────────────────────────────────────┤
│  Porquê GoPools                                                     │
│  Qualidade técnica | Resposta organizada | Experiência Algarve       │
├─────────────────────────────────────────────────────────────────────┤
│  Formulário rápido                                                  │
│  Nome | Telefone | Email | Localidade | Serviço | Mensagem           │
│  [Enviar pedido]                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

## 6. Wireframe visual textual — Dashboard

```txt
┌───────────────┬─────────────────────────────────────────────────────┐
│ GoPools Admin │ Topo: Utilizador | Pesquisa futura | Notificações    │
├───────────────┼─────────────────────────────────────────────────────┤
│ Dashboard     │ ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│ Leads         │ │Leads novas │ │Em aberto   │ │Clientes    │       │
│ Clientes      │ └────────────┘ └────────────┘ └────────────┘       │
│ Piscinas      │ ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│ Serviços      │ │Agendados   │ │Urgentes    │ │Mês atual   │       │
│ Manutenções   │ └────────────┘ └────────────┘ └────────────┘       │
│ Intervenções  │                                                     │
│ Orçamentos    │ Últimas leads | Próximas visitas | Orçamentos pend. │
└───────────────┴─────────────────────────────────────────────────────┘
```

## 7. Wireframe visual textual — Detalhe de lead

```txt
┌─────────────────────────────────────────────────────────────────────┐
│ Lead: Maria Silva                         Estado: Nova | Prioridade │
├─────────────────────────────────────────────────────────────────────┤
│ Dados principais                                                     │
│ Nome | Telefone | Email | Localidade | Origem | Tipo de serviço      │
├─────────────────────────────────────────────────────────────────────┤
│ Mensagem inicial                                                     │
│ "Pretendo remodelar piscina e instalar bomba de calor..."           │
├───────────────────────┬─────────────────────────────────────────────┤
│ Ações                 │ Histórico                                   │
│ [Contactar]           │ - Lead criada via landing page               │
│ [Alterar estado]      │ - Responsável atribuído                      │
│ [Criar orçamento]     │ - Nota adicionada                            │
│ [Converter cliente]   │                                             │
├───────────────────────┴─────────────────────────────────────────────┤
│ Notas | Anexos | Orçamentos associados                              │
└─────────────────────────────────────────────────────────────────────┘
```
