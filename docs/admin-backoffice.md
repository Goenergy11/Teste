# GoPools — Backoffice Inicial

Este incremento liga o backoffice aos primeiros dados reais do Prisma, substituindo placeholders por dashboard e listagens operacionais.

## Incluído

- Dashboard com contagens de leads, clientes, serviços, pedidos urgentes, orçamentos e leads do mês.
- Listagem de leads com estado, prioridade, origem e data de criação.
- Listagem de clientes com tipo, contacto e número de piscinas.
- Listagem de piscinas com cliente, localização, tratamento e equipamentos.
- Listagem de serviços com cliente, piscina, estado e data prevista.
- Listagem de planos de manutenção com valor, próxima visita e estado.
- Listagem de orçamentos com cliente/lead, valor e estado.
- Componentes reutilizáveis `AdminTable` e `StatusBadge`.

## Ainda fora deste incremento

- Criação e edição no backoffice.
- Detalhe individual de cada entidade.
- Filtros e pesquisa avançada.
- Mudanças de estado via UI.
- Exportação e geração de documentos.

## Próximo incremento recomendado

O próximo PR deve adicionar detalhe e atualização de leads: alterar estado, adicionar notas e converter lead em cliente.
