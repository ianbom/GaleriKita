import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { galerikitaAssets } from '../resources/js/lib/galerikita-assets.ts';

test('all landing photo slots use local photographs, not placeholders', () => {
    const paths = Object.values(galerikitaAssets).flatMap(Object.values);
    assert.equal(paths.length, 67);
    for (const path of paths) {
        assert.match(
            path,
            /^\/images\/galerikita\/(landing|wizard)\/.+\.(webp|jpg)$/,
        );
        const image = readFileSync(
            new URL(`../public${path}`, import.meta.url),
        );
        assert.ok(image.length > 1000 && image.length < 200_000, path);
        if (path.endsWith('.webp')) {
            assert.equal(image.toString('ascii', 0, 4), 'RIFF');
            assert.equal(image.toString('ascii', 8, 12), 'WEBP');
        } else {
            assert.equal(image.readUInt16BE(0), 0xffd8);
        }
        const directory = path.includes('/wizard/') ? 'wizard' : 'landing';
        const credits = readFileSync(
            new URL(
                `../public/images/galerikita/${directory}/credits.md`,
                import.meta.url,
            ),
            'utf8',
        );
        assert.ok(
            credits.includes(path.split('/').at(-1)),
            `Missing credit: ${path}`,
        );
    }
});

test('all 67 landing slots have distinct paths, source photos, and file hashes', () => {
    const paths = Object.values(galerikitaAssets).flatMap(Object.values);
    assert.equal(new Set(paths).size, 67, 'Repeated photo path');
    const sources = new Set();
    const hashes = new Set();
    for (const path of paths) {
        const directory = path.includes('/wizard/') ? 'wizard' : 'landing';
        const credits = readFileSync(
            new URL(
                `../public/images/galerikita/${directory}/credits.md`,
                import.meta.url,
            ),
            'utf8',
        );
        const row = credits
            .split('\n')
            .map((line) => line.split('|').map((cell) => cell.trim()))
            .find((cells) => cells[1] === path.split('/').at(-1));
        assert.ok(row, `Missing source: ${path}`);
        const source = row.find((cell) =>
            cell.startsWith('https://www.pexels.com/photo/'),
        );
        assert.ok(source, `Missing Pexels source: ${path}`);
        const sourceId = new URL(source).pathname.match(/(\d+)\/?$/)?.[1];
        assert.ok(sourceId, `Missing photo ID: ${path}`);
        assert.ok(!sources.has(sourceId), `Repeated source photo: ${path}`);
        sources.add(sourceId);
        const hash = createHash('sha256')
            .update(readFileSync(new URL(`../public${path}`, import.meta.url)))
            .digest('hex');
        assert.ok(!hashes.has(hash), `Repeated image bytes: ${path}`);
        hashes.add(hash);
    }
});
