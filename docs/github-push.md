# Envio para GitHub

Este projeto já está commitado localmente. O erro de `git push` acontece quando o repositório ainda não tem um remote `origin` configurado ou quando não existe autenticação GitHub válida no ambiente.

## 1. Criar ou identificar o repositório no GitHub

Crie um repositório vazio no GitHub, por exemplo `gopools-platform`, e copie o URL HTTPS ou SSH.

Exemplos válidos:

```bash
https://github.com/UTILIZADOR/gopools-platform.git
git@github.com:UTILIZADOR/gopools-platform.git
```

## 2. Configurar o remote `origin`

```bash
npm run github:remote -- https://github.com/UTILIZADOR/gopools-platform.git
```

Ou, com SSH:

```bash
npm run github:remote -- git@github.com:UTILIZADOR/gopools-platform.git
```

O script valida se o URL parece ser do GitHub, cria ou atualiza o remote `origin` e configura:

- `push.default=current`
- `push.autoSetupRemote=true`

## 3. Enviar a branch atual

```bash
npm run github:push
```

O script confirma se `origin` existe, valida que aponta para GitHub e executa:

```bash
git push -u origin <branch-atual>
```

## Nota importante

O envio real para GitHub depende de permissões externas ao código: URL do repositório, autenticação HTTPS/token ou chave SSH autorizada na conta GitHub.
