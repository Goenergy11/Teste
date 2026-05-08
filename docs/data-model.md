# GoPools — Modelo de Dados Conceptual

## 1. Visão geral

O modelo de dados deve suportar três áreas principais:

1. **Comercial:** leads, notas, interações e orçamentos.
2. **Cliente:** clientes, moradas, piscinas e equipamentos.
3. **Operação técnica:** serviços, planos de manutenção, intervenções, anexos e histórico.

## 2. Entidades principais

### 2.1 User

Representa utilizadores internos.

Campos previstos:

- id
- name
- email
- passwordHash
- role
- active
- createdAt
- updatedAt

Relações:

- Pode ser responsável por leads.
- Pode ser responsável por serviços.
- Pode criar notas e eventos de atividade.

### 2.2 Lead

Representa oportunidade ou pedido recebido.

Campos previstos:

- id
- name
- phone
- email
- location
- origin
- serviceType
- status
- priority
- ownerId
- message
- nextActionAt
- lostReason
- createdAt
- updatedAt

Estados:

- Nova
- Contactado
- Em análise
- Orçamento enviado
- Ganho
- Perdido

Relações:

- Pode ter notas.
- Pode ter anexos.
- Pode ter interações.
- Pode originar orçamento.
- Pode converter em cliente.

### 2.3 Customer

Representa cliente ativo ou potencial convertido.

Campos previstos:

- id
- name
- phone
- email
- billingAddress
- serviceAddress
- nif
- customerType
- notes
- active
- createdAt
- updatedAt

Tipos:

- Particular
- Alojamento turístico
- Empresa
- Condomínio

Relações:

- Tem uma ou mais piscinas.
- Tem serviços.
- Tem planos de manutenção.
- Tem orçamentos.
- Tem histórico de intervenções através das piscinas.

### 2.4 Pool

Representa uma piscina associada a um cliente.

Campos previstos:

- id
- customerId
- name
- location
- poolType
- constructionType
- dimensions
- estimatedVolume
- treatmentType
- coveringType
- heatingType
- lightingType
- automationNotes
- observations
- createdAt
- updatedAt

Relações:

- Pertence a um cliente.
- Tem equipamentos.
- Tem serviços.
- Tem planos de manutenção.
- Tem intervenções.
- Tem fotografias/anexos.

### 2.5 Equipment

Representa equipamento instalado ou relevante.

Campos previstos:

- id
- poolId
- type
- brand
- model
- serialNumber
- installedAt
- warrantyUntil
- notes
- createdAt
- updatedAt

Tipos exemplificativos:

- Bomba de circulação
- Filtro
- Bomba de calor
- Eletrolisador de sal
- Doseador automático
- Cobertura
- Iluminação
- Automação/controlo

### 2.6 Service

Representa um serviço técnico ou comercial executável.

Campos previstos:

- id
- customerId
- poolId
- type
- title
- description
- status
- scheduledAt
- completedAt
- responsibleId
- priority
- internalNotes
- createdAt
- updatedAt

Tipos:

- Construção
- Remodelação
- Manutenção
- Assistência técnica
- Tratamento de água
- Instalação de equipamentos

Estados:

- Pedido
- Agendado
- Em curso
- Concluído
- Cancelado

### 2.7 MaintenancePlan

Representa contrato ou plano recorrente.

Campos previstos:

- id
- customerId
- poolId
- periodicity
- monthlyValue
- annualValue
- startDate
- endDate
- nextVisitAt
- technicianId
- status
- notes
- createdAt
- updatedAt

Estados:

- Ativo
- Pausado
- Cancelado
- Expirado

### 2.8 Intervention

Representa intervenção técnica realizada ou planeada.

Campos previstos:

- id
- customerId
- poolId
- serviceId
- maintenancePlanId
- technicianId
- scheduledAt
- startedAt
- finishedAt
- summary
- waterParameters
- materialsUsed
- recommendations
- customerSignature
- status
- createdAt
- updatedAt

Relações:

- Pode pertencer a serviço pontual.
- Pode pertencer a plano de manutenção.
- Pode ter anexos e notas.

### 2.9 Quote

Representa orçamento comercial.

Campos previstos:

- id
- customerId
- leadId
- quoteNumber
- title
- description
- estimatedValue
- vatRate
- totalValue
- status
- sentAt
- acceptedAt
- refusedAt
- validUntil
- notes
- createdAt
- updatedAt

Estados:

- Em preparação
- Enviado
- Aceite
- Recusado
- Cancelado

### 2.10 QuoteLine

Representa linhas estruturadas do orçamento, caso a GoPools opte por orçamentos detalhados.

Campos previstos:

- id
- quoteId
- description
- quantity
- unit
- unitPrice
- discount
- vatRate
- total
- sortOrder

### 2.11 Attachment

Representa ficheiros associados.

Campos previstos:

- id
- fileName
- originalName
- url
- mimeType
- size
- entityType
- entityId
- uploadedById
- createdAt

Pode associar-se a:

- Lead
- Customer
- Pool
- Service
- MaintenancePlan
- Intervention
- Quote

### 2.12 Note

Representa nota interna ou comentário operacional.

Campos previstos:

- id
- content
- entityType
- entityId
- authorId
- visibility
- createdAt
- updatedAt

Visibilidade:

- Interna
- Cliente, se no futuro existir portal cliente

### 2.13 ActivityLog

Representa histórico de atividade/auditoria.

Campos previstos:

- id
- entityType
- entityId
- action
- previousValue
- newValue
- metadata
- actorId
- createdAt

Exemplos de ações:

- Lead criada
- Estado alterado
- Responsável atribuído
- Orçamento enviado
- Cliente criado
- Serviço agendado
- Intervenção concluída
- Anexo carregado

## 3. Relações principais

```txt
User 1--N Lead
User 1--N Service
User 1--N Intervention

Lead 1--N Quote
Lead 1--N Note
Lead 1--N Attachment
Lead 1--N ActivityLog

Customer 1--N Pool
Customer 1--N Service
Customer 1--N MaintenancePlan
Customer 1--N Quote

Pool 1--N Equipment
Pool 1--N Service
Pool 1--N MaintenancePlan
Pool 1--N Intervention
Pool 1--N Attachment

MaintenancePlan 1--N Intervention
Service 1--N Intervention
Quote 1--N QuoteLine
```

## 4. Regras de integridade

1. Uma piscina deve pertencer sempre a um cliente.
2. Um plano de manutenção deve estar sempre associado a cliente e piscina.
3. Um serviço pode nascer de uma lead, mas deve associar-se a cliente/piscina quando for operacionalizado.
4. Uma lead ganha deve poder criar ou associar um cliente.
5. Alterações de estado devem criar registo no `ActivityLog`.
6. Anexos devem usar associação polimórfica ou tabelas específicas, a decidir na implementação.
7. Orçamentos podem começar simples, mas o modelo deve permitir linhas detalhadas.

## 5. Índices recomendados

- `Lead.status`
- `Lead.priority`
- `Lead.createdAt`
- `Lead.ownerId`
- `Customer.email`
- `Customer.phone`
- `Pool.customerId`
- `Service.status`
- `Service.scheduledAt`
- `MaintenancePlan.nextVisitAt`
- `Quote.status`
- `ActivityLog.entityType + entityId`

## 6. Decisões pendentes antes do schema Prisma

1. Os anexos serão polimórficos ou tabelas de junção por entidade?
2. Os orçamentos precisam de linhas já na V1 ou bastará descrição/valor total?
3. O cliente pode ter múltiplas moradas ou apenas morada fiscal e morada de serviço?
4. O técnico precisa de app/mobile view dedicada já na V1?
5. A agenda recorrente gera intervenções automaticamente ou apenas sugere próximas visitas?
