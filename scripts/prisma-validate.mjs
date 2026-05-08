import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const prismaBin = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'prisma.cmd' : 'prisma');

if (existsSync(prismaBin)) {
  const result = spawnSync(prismaBin, ['validate'], { cwd: root, stdio: 'inherit', shell: false });
  process.exit(result.status ?? 1);
}

const schema = readFileSync(join(root, 'prisma', 'schema.prisma'), 'utf8');
const required = ['generator client', 'datasource db', 'provider = "postgresql"', 'model User', 'model Lead', 'model Customer', 'model Pool', 'model Service', 'model MaintenancePlan', 'model Intervention', 'model Quote', 'model Attachment', 'model Note', 'model ActivityLog'];

for (const token of required) {
  if (!schema.includes(token)) {
    console.error(`Prisma schema fallback validation failed: missing ${token}`);
    process.exit(1);
  }
}

let balance = 0;
for (const char of schema) {
  if (char === '{') balance += 1;
  if (char === '}') balance -= 1;
  if (balance < 0) break;
}

if (balance !== 0) {
  console.error('Prisma schema fallback validation failed: unbalanced braces');
  process.exit(1);
}

console.log('Prisma schema fallback validation passed (Prisma CLI unavailable).');
