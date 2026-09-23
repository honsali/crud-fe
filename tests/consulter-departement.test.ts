import { expect, test } from 'bun:test';
import { fileURLToPath } from 'node:url';

test('department consultation isolates action subscriptions and preserves shared MVC state', () => {
    // Isolate module mocks from the form-boundary suite.
    const result = Bun.spawnSync([process.execPath, 'tests/fixtures/consulter-departement.ts'], {
        cwd: fileURLToPath(new URL('../', import.meta.url)),
        stdout: 'pipe',
        stderr: 'pipe',
    });

    expect(result.exitCode, result.stdout.toString() + result.stderr.toString()).toBe(0);
});
