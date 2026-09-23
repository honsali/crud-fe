import { expect, test } from 'bun:test';
import { fileURLToPath } from 'node:url';

test('action hooks isolate list, initialization, command and filter subscriptions', () => {
    const result = Bun.spawnSync([process.execPath, 'tests/fixtures/action-hooks.ts'], {
        cwd: fileURLToPath(new URL('../', import.meta.url)),
        stdout: 'pipe',
        stderr: 'pipe',
    });
    expect(result.exitCode, result.stdout.toString() + result.stderr.toString()).toBe(0);
});
