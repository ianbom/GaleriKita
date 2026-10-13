import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getDemoId } from '../resources/js/admin/lib/utils.ts';
import { csvCell } from '../resources/js/admin/lib/download-csv.ts';

assert.equal(csvCell('a,b'), '"a,b"');
assert.equal(csvCell('say "hello"'), '"say ""hello"""');
assert.equal(csvCell('=SUM(A1:A2)'), '"\'=SUM(A1:A2)"');
assert.equal(csvCell(' +cmd'), '"\' +cmd"');
assert.equal(csvCell(null), '""');
for (const name of ['tasks', 'users']) {
    const rows = JSON.parse(
        readFileSync(
            new URL(
                '../resources/js/admin/features/' +
                    name +
                    '/data/' +
                    name +
                    '.json',
                import.meta.url,
            ),
        ),
    );
    assert.ok(rows.length > 0);
    assert.equal(new Set(rows.map((row) => row.id)).size, rows.length);
    assert.ok(rows.every((row) => !('password' in row)));
}
console.log('Admin demo checks passed.');

const ids = Array.from({ length: 100 }, () => getDemoId());
assert.equal(new Set(ids).size, ids.length);
assert.ok(ids.every((id) => /^[a-f0-9]{32}$/.test(id)));
