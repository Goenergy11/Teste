# Envio para GitHub

O projeto está commitado localmente. Para carregar no GitHub, o ambiente precisa de pelo menos um destino real: um URL de repositório com permissões de escrita, uma chave SSH autorizada ou um token GitHub válido.

## Opção A — Enviar passando o URL no comando

Depois de criar um repositório vazio no GitHub, execute:

```bash
npm run github:push -- https://github.com/UTILIZADOR/gopools-platform.git
```

Ou, com SSH:

```bash
npm run github:push -- git@github.com:UTILIZADOR/gopools-platform.git
```

O script valida o URL, cria ou atualiza o remote `origin`, configura `push.default=current` e `push.autoSetupRemote=true`, e envia a branch atual.

## Opção B — Enviar com `GITHUB_REMOTE_URL`

```bash
GITHUB_REMOTE_URL=https://github.com/UTILIZADOR/gopools-platform.git npm run github:push
```

Esta opção é útil para CI/CD ou ambientes onde o URL deve vir de variáveis de ambiente.

## Opção C — Criar/configurar automaticamente com token

Se o repositório ainda não existir, o script consegue criá-lo pela API do GitHub quando recebe um token válido:

```bash
GITHUB_TOKEN=ghp_... \
GITHUB_OWNER=UTILIZADOR \
GITHUB_REPOSITORY_NAME=gopools-platform \
GITHUB_REPO_VISIBILITY=private \
npm run github:publish
```

Também pode usar `GH_TOKEN` em vez de `GITHUB_TOKEN`. O token deve ter permissões para criar repositórios ou escrever no repositório de destino.

## Validar sem enviar

Para testar a configuração sem executar `git push`, use:

```bash
GITHUB_PUSH_DRY_RUN=1 npm run github:push -- https://github.com/UTILIZADOR/gopools-platform.git
```

O modo dry run valida o URL, prepara o remote e confirma a branch que seria enviada, mas não faz upload para o GitHub.

## Comandos disponíveis

```bash
npm run github:remote -- https://github.com/UTILIZADOR/gopools-platform.git
npm run github:push
npm run github:publish
```

- `github:remote` apenas configura/atualiza o remote.
- `github:push` configura por argumento/env quando possível e envia a branch atual.
- `github:publish` é um alias explícito para o fluxo automático com token.

## Limitação de segurança

Sem URL/autenticação não é possível carregar ficheiros para uma conta GitHub específica. O código não deve inventar um destino nem pedir credenciais interativamente; o destino deve ser fornecido por URL, SSH ou variáveis de ambiente.
