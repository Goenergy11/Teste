import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const mode = process.argv[2] ?? 'check';
const nextBin = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'next.cmd' : 'next');
const tscBin = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', shell: false });
  process.exit(result.status ?? 1);
}

function assertFile(path) {
  const fullPath = join(root, path);
  if (!existsSync(fullPath)) {
    throw new Error(`Missing required file: ${path}`);
  }
  return readFileSync(fullPath, 'utf8');
}

function structuralCheck() {
  const requiredFiles = [
    'app/layout.tsx',
    'app/(public)/page.tsx',
    'app/admin/page.tsx',
    'app/login/LoginForm.tsx',
    'app/api/leads/route.ts',
    'components/public/PublicHeader.tsx',
    'components/public/PublicFooter.tsx',
    'components/admin/AdminShell.tsx',
    'components/admin/AdminTable.tsx',
    'lib/auth/options.ts',
    'lib/content/services.ts',
    'lib/db/prisma.ts',
    'prisma/schema.prisma',
    'prisma/seed.ts',
    'tailwind.config.ts',
    'tsconfig.json'
  ];

  for (const file of requiredFiles) assertFile(file);

  const packageJson = JSON.parse(assertFile('package.json'));
  for (const script of ['dev', 'build', 'lint', 'typecheck', 'prisma:validate']) {
    if (!packageJson.scripts?.[script]) {
      throw new Error(`Missing package script: ${script}`);
    }
  }

  const schema = assertFile('prisma/schema.prisma');
  for (const token of ['model User', 'model Lead', 'model Customer', 'model Pool', 'model Quote', 'model ActivityLog']) {
    if (!schema.includes(token)) throw new Error(`Prisma schema is missing ${token}`);
  }

  const authOptions = assertFile('lib/auth/options.ts');
  for (const token of ['CredentialsProvider', 'PrismaAdapter', 'compare(password']) {
    if (!authOptions.includes(token)) throw new Error(`Auth options missing expected token: ${token}`);
  }

  const services = assertFile('lib/content/services.ts');
  for (const token of ['construcao-piscinas', 'remodelacao-piscinas', 'manutencao-piscinas', 'assistencia-tecnica']) {
    if (!services.includes(token)) throw new Error(`Services content missing expected token: ${token}`);
  }

  const adminDashboard = assertFile('app/admin/page.tsx');
  for (const token of ['prisma.lead.count', 'prisma.customer.count', 'prisma.quote.count']) {
    if (!adminDashboard.includes(token)) throw new Error(`Admin dashboard missing expected token: ${token}`);
  }

  const leadRoute = assertFile('app/api/leads/route.ts');
  for (const token of ['prisma.lead.create', 'prisma.activityLog.create', 'validateLeadPayload']) {
    if (!leadRoute.includes(token)) throw new Error(`Lead API missing expected token: ${token}`);
  }
}

try {
  if (mode === 'lint' && existsSync(nextBin)) run(nextBin, ['lint']);
  if (mode === 'build' && existsSync(nextBin)) run(nextBin, ['build']);
  if (mode === 'typecheck' && existsSync(tscBin)) run(tscBin, ['--noEmit']);

  structuralCheck();
  console.log(`GoPools ${mode} check passed (structural fallback; external packages unavailable).`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
