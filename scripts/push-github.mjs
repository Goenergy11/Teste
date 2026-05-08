#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process';

function git(args, options = {}) {
  return execFileSync('git', args, { encoding: 'utf8', ...options }).trim();
}

function fail(message) {
  console.error(`\n${message}\n`);
  console.error('Configure primeiro o remote GitHub:');
  console.error('  npm run github:remote -- https://github.com/UTILIZADOR/REPOSITORIO.git');
  console.error('ou');
  console.error('  npm run github:remote -- git@github.com:UTILIZADOR/REPOSITORIO.git');
  process.exit(1);
}

const origin = (() => {
  try {
    return git(['remote', 'get-url', 'origin']);
  } catch {
    return '';
  }
})();

if (!origin) {
  fail('Erro: não existe remote origin configurado.');
}

const isGithub = /^https:\/\/github\.com\//.test(origin) || /^git@github\.com:/.test(origin);
if (!isGithub) {
  fail(`Erro: o remote origin não aponta para GitHub: ${origin}`);
}

const branch = git(['branch', '--show-current']);
if (!branch) {
  fail('Erro: não foi possível identificar a branch atual.');
}

const status = spawnSync('git', ['push', '-u', 'origin', branch], { stdio: 'inherit' });
process.exit(status.status ?? 1);
