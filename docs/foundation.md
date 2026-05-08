# GoPools — Fundação Técnica

Este incremento corresponde ao primeiro PR recomendado no plano V1: `chore: scaffold Next.js application`.

## Incluído

- Projeto Next.js com App Router.
- TypeScript em modo estrito.
- Tailwind CSS e tokens de marca iniciais.
- Estrutura de pastas alinhada com o plano V1.
- Layout público com header/footer.
- Layout administrativo placeholder.
- Páginas públicas placeholder para validar navegação.
- README atualizado para diferenciar documentação de planeamento e fundação técnica.

## Ainda fora deste incremento

- APIs.
- Formulários funcionais.
- CRUD administrativo.
- Upload de fotografias.

## Comandos previstos

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Incremento seguinte concluído

A fundação de base de dados e autenticação é documentada em [`database-auth.md`](database-auth.md).

## Checks em ambiente limitado

Se o ambiente não conseguir instalar dependências externas, os scripts `npm run lint`, `npm run typecheck`, `npm run build` e `npm run prisma:validate` executam validações estruturais de fallback para impedir que a revisão fique bloqueada por falhas de rede. Em desenvolvimento local com dependências instaladas, os scripts usam as ferramentas reais quando disponíveis.
