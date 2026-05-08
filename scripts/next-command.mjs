import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const command = process.argv[2] ?? 'dev';
const nextBin = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'next.cmd' : 'next');

if (!existsSync(nextBin)) {
  console.error(`Next.js is not installed locally. Run npm install in an environment with npm registry access before npm run ${command}.`);
  process.exit(1);
}

const result = spawnSync(nextBin, [command], { cwd: root, stdio: 'inherit', shell: false });
process.exit(result.status ?? 1);
