import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { wizardAssets } from '../resources/js/lib/galerikita-assets.ts';
import {
    getEventEntry,
    getEventEnd,
    hostEventDraft,
    eventPlans,
    toEventDate,
    validateEventStep,
} from '../resources/js/lib/host-event-wizard.ts';

const validDraft = {
    category: 'Pernikahan',
    name: 'Resepsi Keluarga',
    cover: new File(['cover'], 'cover.png', { type: 'image/png' }),
    startDate: '2027-04-12',
    startTime: '13:30',
    visibility: 'private',
    revealMode: 'instant',
    planId: 'mini',
};

test('home wizard requires authentication without changing the normal landing', () => {
    assert.equal(getEventEntry('/', false), 'landing');
    assert.equal(getEventEntry('/', true), 'landing');
    assert.equal(getEventEntry('/?create-event=0', true), 'landing');
    assert.equal(getEventEntry('/?create-event=1', false), 'auth');
    assert.equal(getEventEntry('/?create-event=1', true), 'wizard');
});

test('calendar preserves the local date and does not convert it to UTC', () => {
    assert.equal(toEventDate(new Date(2027, 0, 2)), '2027-01-02');
    assert.equal(toEventDate(new Date(2028, 1, 29)), '2028-02-29');
    assert.equal(toEventDate(new Date(NaN)), '');
});

test('Private is the UI default, not a new backend access policy', () => {
    assert.equal(hostEventDraft.visibility, 'private');
});

test('wizard photographs are local JPEGs with retained credits', () => {
    assert.equal(Object.keys(wizardAssets).length, 6);
    for (const path of Object.values(wizardAssets)) {
        const image = readFileSync(
            new URL(`../public${path}`, import.meta.url),
        );
        assert.equal(image.readUInt16BE(0), 0xffd8);
        assert.ok(image.length < 200_000);
    }
    const credits = readFileSync(
        new URL(
            '../public/images/galerikita/wizard/credits.md',
            import.meta.url,
        ),
        'utf8',
    );
    assert.match(credits, /Pexels/);
});

test('validates only the active step fields', () => {
    assert.deepEqual(validateEventStep(0, { ...validDraft, name: '' }), {});
    assert.deepEqual(validateEventStep(1, { ...validDraft, name: '' }), {
        name: 'Nama event wajib diisi.',
    });
    assert.deepEqual(validateEventStep(2, { ...validDraft, startDate: '' }), {
        startDate: 'Pilih tanggal mulai.',
    });
});

test('rejects invalid or past event start times', () => {
    assert.equal(
        validateEventStep(
            2,
            { ...validDraft, startDate: '2027-02-30' },
            new Date('2027-01-01T00:00:00'),
        ).startDate,
        'Tanggal mulai tidak valid.',
    );
    assert.equal(
        validateEventStep(
            2,
            { ...validDraft, startDate: '2026-12-31', startTime: '01:00' },
            new Date('2027-01-01T00:00:00'),
        ).startDate,
        'Waktu mulai harus di masa depan.',
    );
});

test('event end is exactly 24 hours after start', () => {
    const end = getEventEnd('2027-04-12', '13:30');
    assert.equal(
        end.getTime() - new Date('2027-04-12T13:30').getTime(),
        86_400_000,
    );
});

test('requires a category from the document', () => {
    assert.equal(
        validateEventStep(0, { ...validDraft, category: 'Unknown' }).category,
        'Pilih kategori event.',
    );
});

test('requires a name and an image cover', () => {
    assert.equal(
        validateEventStep(1, { ...validDraft, name: '   ' }).name,
        'Nama event wajib diisi.',
    );
    assert.equal(
        validateEventStep(1, { ...validDraft, cover: null }).cover,
        'Pilih foto sampul event.',
    );
    assert.equal(
        validateEventStep(1, {
            ...validDraft,
            cover: new File(['text'], 'cover.txt', { type: 'text/plain' }),
        }).cover,
        'File sampul harus berupa gambar.',
    );
});

test('requires valid visibility and reveal choices independently', () => {
    assert.equal(
        validateEventStep(3, { ...validDraft, visibility: '' }).visibility,
        'Pilih visibilitas album.',
    );
    assert.equal(
        validateEventStep(4, { ...validDraft, revealMode: '' }).revealMode,
        'Pilih aturan reveal foto.',
    );
    assert.deepEqual(
        validateEventStep(4, {
            ...validDraft,
            visibility: 'private',
            revealMode: 'after-event',
        }),
        {},
    );
});

test('rejects missing, invalid, and equal-to-now start times', () => {
    assert.equal(
        validateEventStep(2, { ...validDraft, startTime: '' }).startTime,
        'Pilih jam mulai.',
    );
    assert.equal(
        validateEventStep(2, { ...validDraft, startTime: '24:01' }).startTime,
        'Jam mulai tidak valid.',
    );
    assert.equal(
        validateEventStep(2, validDraft, new Date('2027-04-12T13:30'))
            .startDate,
        'Waktu mulai harus di masa depan.',
    );
});

test('fixed plans contain the requested photographer, quota, and price values', () => {
    assert.deepEqual(
        eventPlans.map(
            ({
                id,
                name,
                photographers,
                photosPerPhotographer,
                totalPhotos,
                price,
            }) => [
                id,
                name,
                photographers,
                photosPerPhotographer,
                totalPhotos,
                price,
            ],
        ),
        [
            ['mini', 'Mini', 10, 20, 200, 29_000],
            ['intimate', 'Intimate', 25, 20, 500, 49_000],
            ['celebration', 'Celebration', 50, 20, 1_000, 79_000],
            ['grand', 'Grand', 100, 20, 2_000, 129_000],
            ['festival', 'Festival', 200, 20, 4_000, 219_000],
            ['big-event', 'Big Event', 400, 20, 8_000, 349_000],
        ],
    );
    assert.deepEqual(validateEventStep(5, validDraft), {});
    assert.equal(
        validateEventStep(5, { ...validDraft, planId: '' }).planId,
        'Pilih plan event.',
    );
    assert.equal(
        validateEventStep(5, { ...validDraft, planId: 'unknown' }).planId,
        'Pilih plan event.',
    );
});

test('plan selection starts empty and accepts only the six fixed plans', () => {
    assert.equal(hostEventDraft.planId, '');
    assert.equal('photographers' in hostEventDraft, false);
    assert.equal('photosPerPhotographer' in hostEventDraft, false);
    assert.deepEqual(validateEventStep(5, hostEventDraft), {
        planId: 'Pilih plan event.',
    });
    for (const plan of eventPlans) {
        assert.equal(
            plan.totalPhotos,
            plan.photographers * plan.photosPerPhotographer,
        );
        assert.deepEqual(
            validateEventStep(5, { ...validDraft, planId: plan.id }),
            {},
        );
    }
    assert.deepEqual(validateEventStep(0, { ...validDraft, planId: '' }), {});
});

test('validation never mutates the chosen fields', () => {
    const draft = { ...validDraft };
    for (let step = 0; step < 6; step++)
        validateEventStep(step, draft, new Date('2027-01-01'));
    assert.deepEqual(draft, validDraft);
});

test('keeps 24-hour duration across year, leap day, and DST boundaries', () => {
    for (const date of ['2027-12-31', '2028-02-28']) {
        assert.equal(
            getEventEnd(date, '13:30').getTime() -
                new Date(`${date}T13:30`).getTime(),
            86_400_000,
        );
    }
    const originalTimezone = process.env.TZ;
    try {
        process.env.TZ = 'America/New_York';
        assert.equal(
            getEventEnd('2027-03-13', '13:30').getTime() -
                new Date('2027-03-13T13:30').getTime(),
            86_400_000,
        );
        assert.equal(
            validateEventStep(
                2,
                { ...validDraft, startDate: '2027-03-14', startTime: '02:30' },
                new Date('2027-01-01'),
            ).startTime,
            'Jam mulai tidak valid pada zona waktu ini.',
        );
    } finally {
        if (originalTimezone === undefined) delete process.env.TZ;
        else process.env.TZ = originalTimezone;
    }
});
