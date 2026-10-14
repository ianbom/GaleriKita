export type HostEventDraft = {
    category: string;
    name: string;
    cover: File | null;
    startDate: string;
    startTime: string;
    visibility: 'private' | 'public' | '';
    revealMode: 'instant' | 'after-event' | '';
    photographers: number;
    photosPerPhotographer: number;
};

export type HostEventFieldErrors = Partial<
    Record<keyof HostEventDraft, string>
>;

export const eventCategories = [
    'Pernikahan',
    'Ulang Tahun',
    'Perjalanan',
    'Gathering',
    'Wisuda',
    'Lainnya',
];

export const previewPlans = [
    { photographers: 10, photosPerPhotographer: 100, price: 50_000 },
    { photographers: 100, photosPerPhotographer: 100, price: 500_000 },
];

export const hostEventDraft: HostEventDraft = {
    category: '',
    name: '',
    cover: null,
    startDate: '',
    startTime: '',
    visibility: 'private',
    revealMode: '',
    photographers: 10,
    photosPerPhotographer: 100,
};

export function getEventEnd(date: string, time: string): Date {
    const start = new Date(`${date}T${time}`);
    return new Date(start.getTime() + 24 * 60 * 60 * 1000);
}

export function getEventEntry(url: string, authenticated: boolean) {
    const query = new URLSearchParams(url.split('?')[1]?.split('#')[0] ?? '');
    if (query.get('create-event') !== '1') return 'landing';
    return authenticated ? 'wizard' : 'auth';
}

export function toEventDate(date: Date): string {
    if (Number.isNaN(date.getTime())) return '';
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
    ].join('-');
}

export function validateEventStep(
    step: number,
    draft: HostEventDraft,
    now = new Date(),
): HostEventFieldErrors {
    const errors: HostEventFieldErrors = {};

    if (step === 0 && !eventCategories.includes(draft.category)) {
        errors.category = 'Pilih kategori event.';
    }

    if (step === 1) {
        if (!draft.name.trim()) errors.name = 'Nama event wajib diisi.';
        if (!draft.cover) errors.cover = 'Pilih foto sampul event.';
        else if (!draft.cover.type.startsWith('image/')) {
            errors.cover = 'File sampul harus berupa gambar.';
        }
    }

    if (step === 2) {
        if (!draft.startDate) errors.startDate = 'Pilih tanggal mulai.';
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.startDate)) {
            errors.startDate = 'Tanggal mulai tidak valid.';
        } else {
            const [year, month, day] = draft.startDate.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            if (
                date.getFullYear() !== year ||
                date.getMonth() !== month - 1 ||
                date.getDate() !== day
            ) {
                errors.startDate = 'Tanggal mulai tidak valid.';
            }
        }

        if (!draft.startTime) errors.startTime = 'Pilih jam mulai.';
        else if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.startTime)) {
            errors.startTime = 'Jam mulai tidak valid.';
        }

        if (!errors.startDate && !errors.startTime) {
            const start = new Date(`${draft.startDate}T${draft.startTime}`);
            const [hours, minutes] = draft.startTime.split(':').map(Number);
            if (start.getHours() !== hours || start.getMinutes() !== minutes) {
                errors.startTime = 'Jam mulai tidak valid pada zona waktu ini.';
            } else if (start <= now) {
                errors.startDate = 'Waktu mulai harus di masa depan.';
            }
        }
    }

    if (step === 3 && !['private', 'public'].includes(draft.visibility)) {
        errors.visibility = 'Pilih visibilitas album.';
    }

    if (step === 4 && !['instant', 'after-event'].includes(draft.revealMode)) {
        errors.revealMode = 'Pilih aturan reveal foto.';
    }

    if (step === 5) {
        if (
            !Number.isSafeInteger(draft.photographers) ||
            draft.photographers < 1
        ) {
            errors.photographers = 'Pilih kuota fotografer.';
        }
        if (
            !Number.isSafeInteger(draft.photosPerPhotographer) ||
            draft.photosPerPhotographer < 1
        ) {
            errors.photosPerPhotographer = 'Pilih kuota foto.';
        }
        if (
            !errors.photographers &&
            !errors.photosPerPhotographer &&
            !previewPlans.some(
                (plan) =>
                    plan.photographers === draft.photographers &&
                    plan.photosPerPhotographer === draft.photosPerPhotographer,
            )
        ) {
            errors.photographers = 'Pilih salah satu pilihan plan.';
        }
    }

    return errors;
}
