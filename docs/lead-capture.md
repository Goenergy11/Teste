# GoPools — Captação de Leads

Este incremento liga os formulários públicos ao backend inicial, permitindo criar leads automaticamente a partir do website.

## Incluído

- Endpoint `POST /api/leads` para receber pedidos públicos.
- Validação manual de payload, sem dependência obrigatória de bibliotecas externas em runtime.
- Honeypot simples (`company`) para reduzir submissões automáticas básicas.
- Criação de `Lead` com estado inicial `NEW` e prioridade `NORMAL` definida pelo schema.
- Criação de `ActivityLog` associada à lead, com origem e tipo de serviço no metadata.
- Formulário público com estados de envio, sucesso e erro.
- Origem configurável por página: homepage, contactos e landing de orçamento.

## Ainda fora deste incremento

- Upload real de fotografias.
- Formulários específicos de manutenção e assistência técnica com campos próprios.
- Notificações por email/WhatsApp.
- Dashboard ligado a métricas reais.
- Proteção anti-spam avançada como reCAPTCHA, Turnstile ou rate limiting.

## Próximo incremento recomendado

O próximo PR deve ligar o dashboard e a gestão de leads às primeiras queries reais da base de dados, permitindo listar leads criadas pelo formulário.
