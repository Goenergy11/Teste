#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

const remoteUrl = process.argv[2] ?? process.env.GITHUB_REMOTE_URL;

function fail(message) {
  console.error(`\n${message}\n`);
  console.error('Uso:');
  console.error('  npm run github:remote -- https://github.com/UTILIZADOR/REPOSITORIO.git');
  console.error('  npm run github:remote -- git@github.com:UTILIZADOR/REPOSITORIO.git');
  console.error('\nTambém pode definir GITHUB_REMOTE_URL no ambiente.');
  process.exit(1);
}

if (!remoteUrl) {
  fail('Erro: falta o URL do repositório GitHub.');
}

const isHttpsGithub = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?$/.test(remoteUrl);
const isSshGithub = /^git@github\.com:[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?$/.test(remoteUrl);

if (!isHttpsGithub && !isSshGithub) {
  fail(`Erro: o URL recebido não parece ser um remote GitHub válido: ${remoteUrl}`);
}

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

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

const branch = git(['branch', '--show-current']) || 'work';
console.log(`Branch atual: ${branch}`);
console.log('Configuração pronta. Para enviar:');
console.log(`  git push -u origin ${branch}`);
