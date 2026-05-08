#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process';

const explicitRemoteUrl = process.argv[2] ?? process.env.GITHUB_REMOTE_URL;
const githubOwner = process.env.GITHUB_OWNER;
const githubRepo = process.env.GITHUB_REPOSITORY_NAME ?? process.env.GITHUB_REPO_NAME;
const githubToken = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
const repoVisibility = process.env.GITHUB_REPO_VISIBILITY ?? 'private';
const dryRun = process.env.GITHUB_PUSH_DRY_RUN === '1' || process.env.GITHUB_PUSH_DRY_RUN === 'true';

function git(args, options = {}) {
  return execFileSync('git', args, { encoding: 'utf8', ...options }).trim();
}

function fail(message) {
  console.error(`\n${message}\n`);
  console.error('Formas suportadas para configurar e enviar:');
  console.error('  npm run github:push -- https://github.com/UTILIZADOR/REPOSITORIO.git');
  console.error('  GITHUB_REMOTE_URL=https://github.com/UTILIZADOR/REPOSITORIO.git npm run github:push');
  console.error('  GITHUB_TOKEN=... GITHUB_OWNER=UTILIZADOR GITHUB_REPOSITORY_NAME=REPOSITORIO npm run github:publish');
  process.exit(1);
}

function getOrigin() {
  try {
    return git(['remote', 'get-url', 'origin'], { stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return '';
  }
}

function isValidGithubRemote(remoteUrl) {
  return /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?$/.test(remoteUrl)
    || /^git@github\.com:[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?$/.test(remoteUrl);
}

function normalizeHttpsRemote(owner, repo) {
  return `https://github.com/${owner}/${repo.replace(/\.git$/, '')}.git`;
}

function remoteOwnerRepo(remoteUrl) {
  const httpsMatch = remoteUrl.match(/^https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?$/);
  if (httpsMatch) {
    return { owner: httpsMatch[1], repo: httpsMatch[2] };
  }

  const sshMatch = remoteUrl.match(/^git@github\.com:([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?$/);
  if (sshMatch) {
    return { owner: sshMatch[1], repo: sshMatch[2] };
  }

  return null;
}

function setOrigin(remoteUrl) {
  const remotes = git(['remote']).split('\n').filter(Boolean);
  if (remotes.includes('origin')) {
    git(['remote', 'set-url', 'origin', remoteUrl]);
    console.log(`Remote origin atualizado para ${remoteUrl}`);
  } else {
    git(['remote', 'add', 'origin', remoteUrl]);
    console.log(`Remote origin criado com ${remoteUrl}`);
  }

  git(['config', 'push.default', 'current']);
  git(['config', 'push.autoSetupRemote', 'true']);
}

async function githubRequest(path, options = {}) {
  if (!githubToken) {
    fail('Erro: falta GITHUB_TOKEN ou GH_TOKEN para criar/verificar o repositório GitHub automaticamente.');
  }

  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${githubToken}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...options.headers,
    },
  });

  if (response.status === 404) {
    return { ok: false, status: 404, body: null };
  }

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  return { ok: response.ok, status: response.status, body };
}

async function ensureGithubRepository(owner, repo) {
  const existing = await githubRequest(`/repos/${owner}/${repo}`);
  if (existing.ok) {
    console.log(`Repositório GitHub encontrado: ${owner}/${repo}`);
    return;
  }

  if (existing.status !== 404) {
    const detail = existing.body?.message ? ` ${existing.body.message}` : '';
    fail(`Erro ao verificar repositório GitHub (${existing.status}).${detail}`);
  }

  const visibility = repoVisibility === 'public' ? 'public' : 'private';
  const created = await githubRequest('/user/repos', {
    method: 'POST',
    body: JSON.stringify({
      name: repo,
      private: visibility !== 'public',
      auto_init: false,
      description: 'GoPools platform',
    }),
  });

  if (!created.ok) {
    const detail = created.body?.message ? ` ${created.body.message}` : '';
    fail(`Erro ao criar repositório GitHub (${created.status}).${detail}`);
  }

  console.log(`Repositório GitHub criado: ${owner}/${repo} (${visibility})`);
}

function pushRemoteUrl(origin) {
  if (!githubToken || !origin.startsWith('https://github.com/')) {
    return origin;
  }

  return origin.replace('https://github.com/', `https://x-access-token:${githubToken}@github.com/`);
}

async function main() {
  let origin = getOrigin();

  if (explicitRemoteUrl) {
    if (!isValidGithubRemote(explicitRemoteUrl)) {
      fail(`Erro: o URL recebido não parece ser um remote GitHub válido: ${explicitRemoteUrl}`);
    }
    setOrigin(explicitRemoteUrl);
    origin = explicitRemoteUrl;
  }

  if (!origin && githubOwner && githubRepo) {
    if (!dryRun) {
      await ensureGithubRepository(githubOwner, githubRepo);
    }
    origin = normalizeHttpsRemote(githubOwner, githubRepo);
    setOrigin(origin);
  }

  if (!origin) {
    fail('Erro: não existe remote origin configurado e não foram fornecidos GITHUB_REMOTE_URL ou GITHUB_OWNER/GITHUB_REPOSITORY_NAME.');
  }

  if (!isValidGithubRemote(origin)) {
    fail(`Erro: o remote origin não aponta para GitHub: ${origin}`);
  }

  const branch = git(['branch', '--show-current']);
  if (!branch) {
    fail('Erro: não foi possível identificar a branch atual.');
  }

  const repo = remoteOwnerRepo(origin);
  if (repo && githubToken && !dryRun) {
    await ensureGithubRepository(repo.owner, repo.repo);
  }

  if (dryRun) {
    console.log(`Dry run ativo: branch ${branch} pronta para envio para ${origin}`);
    process.exit(0);
  }

  console.log(`A enviar branch ${branch} para ${origin}`);
  const result = spawnSync('git', ['push', '-u', pushRemoteUrl(origin), branch], { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}

main().catch((error) => fail(`Erro inesperado ao preparar o push: ${error.message}`));
