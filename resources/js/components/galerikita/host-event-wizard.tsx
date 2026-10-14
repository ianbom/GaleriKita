import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ImagePlus,
    LoaderCircle,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/admin/components/ui/calendar';
import { Switch } from '@/admin/components/ui/switch';
import { id } from 'react-day-picker/locale';
import { wizardAssets } from '@/lib/galerikita-assets';
import {
    eventCategories,
    getEventEnd,
    toEventDate,
    hostEventDraft,
    previewPlans,
    validateEventStep,
} from '@/lib/host-event-wizard';
import type {
    HostEventDraft,
    HostEventFieldErrors,
} from '@/lib/host-event-wizard';
import { dashboard, home } from '@/routes';

const steps = [
    {
        label: 'Kategori',
        title: 'Acara apa yang kamu rencanakan?',
        description: 'Pilih kategori yang paling sesuai dengan acara kamu.',
    },
    {
        label: 'Identitas',
        title: 'Beri nama untuk momenmu.',
        description:
            'Nama dan sampul membantu fotografer mengenali acara kamu.',
    },
    {
        label: 'Jadwal',
        title: 'Kapan acaranya dimulai?',
        description: 'Satu acara, 24 jam untuk mengabadikan semua momen.',
    },
    {
        label: 'Visibilitas',
        title: 'Siapa yang bisa melihat foto?',
        description:
            'Tentukan visibilitas album untuk fotografer yang bergabung.',
    },
    {
        label: 'Reveal',
        title: 'Kapan foto dibagikan?',
        description: 'Atur kapan foto orang lain muncul di album Public.',
    },
    {
        label: 'Plan',
        title: 'Siapkan ruang untuk semua momen.',
        description: 'Pilih kapasitas fotografer dan foto untuk acara kamu.',
    },
    {
        label: 'Checkout',
        title: 'Periksa sekali lagi.',
        description: 'Pastikan detail acara sudah sesuai sebelum melanjutkan.',
    },
    {
        label: 'Detail',
        title: 'Semua detail di satu tempat.',
        description: 'Pratinjau informasi event setelah alur checkout.',
    },
];

type PaymentResult = 'pending' | 'failed' | 'expired' | 'success';
type PaymentStatus = PaymentResult | 'idle' | 'processing';

function Choices({
    id,
    label,
    value,
    options,
    error,
    onChange,
}: {
    id: string;
    label: string;
    value: string;
    options: { value: string; label: string; description?: string }[];
    error?: string;
    onChange: (value: string) => void;
}) {
    return (
        <fieldset
            id={id}
            tabIndex={-1}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
        >
            <legend className="mb-4 text-base font-semibold">{label}</legend>
            <div className="grid gap-3">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex min-h-24 cursor-pointer items-start gap-3 rounded-xl border border-muted-foreground/70 bg-card p-5 transition-colors has-checked:border-primary has-checked:bg-primary/5 has-focus-visible:ring-2 has-focus-visible:ring-ring"
                    >
                        <input
                            className="mt-1 size-4 shrink-0 accent-primary"
                            type="radio"
                            name={id}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                        />
                        <span className="min-w-0">
                            <span className="block font-semibold">
                                {option.label}
                            </span>
                            {option.description && (
                                <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                                    {option.description}
                                </span>
                            )}
                        </span>
                    </label>
                ))}
            </div>
            {error && (
                <p
                    id={`${id}-error`}
                    role="alert"
                    className="mt-3 text-sm text-destructive-foreground"
                >
                    {error}
                </p>
            )}
        </fieldset>
    );
}

export default function HostEventWizard() {
    const [step, setStep] = useState(0);
    const [draft, setDraft] = useState<HostEventDraft>({ ...hostEventDraft });
    const [errors, setErrors] = useState<HostEventFieldErrors>({});
    const [coverUrl, setCoverUrl] = useState('');
    const [coverLoading, setCoverLoading] = useState(false);
    const [payment, setPayment] = useState<PaymentStatus>('idle');
    const [paymentResult, setPaymentResult] =
        useState<PaymentResult>('pending');
    const heading = useRef<HTMLHeadingElement>(null);
    const form = useRef<HTMLFormElement>(null);
    const imageUrl = useRef('');
    const paymentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const busy = useRef(false);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const plan = previewPlans.find(
        (option) =>
            option.photographers === draft.photographers &&
            option.photosPerPhotographer === draft.photosPerPhotographer,
    );
    const money = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(value);
    const dateFormat = new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: timezone,
    });
    const start = new Date(`${draft.startDate}T${draft.startTime}`);
    const end = getEventEnd(draft.startDate, draft.startTime);
    const validSchedule =
        !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime());
    const processing = payment === 'processing';

    useEffect(() => {
        heading.current?.focus();
    }, [step]);
    useEffect(() => {
        if (Object.keys(errors).length)
            form.current
                ?.querySelector<HTMLElement>('[aria-invalid="true"]')
                ?.focus();
    }, [errors]);
    useEffect(
        () => () => {
            if (imageUrl.current) URL.revokeObjectURL(imageUrl.current);
            imageUrl.current = '';
            if (paymentTimer.current) clearTimeout(paymentTimer.current);
        },
        [],
    );

    function update(values: Partial<HostEventDraft>) {
        setDraft((current) => ({ ...current, ...values }));
        setErrors({});
        setPayment('idle');
    }

    function selectCover(file: File | null) {
        if (imageUrl.current) URL.revokeObjectURL(imageUrl.current);
        imageUrl.current = '';
        setCoverUrl('');
        setCoverLoading(false);
        update({ cover: null });
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setErrors({ cover: 'File sampul harus berupa gambar.' });
            return;
        }
        const url = URL.createObjectURL(file);
        imageUrl.current = url;
        setCoverUrl(url);
        setCoverLoading(true);
        const image = new window.Image();
        image.onload = () => {
            if (imageUrl.current !== url) return;
            setCoverLoading(false);
            update({ cover: file });
        };
        image.onerror = () => {
            if (imageUrl.current !== url) return;
            selectCover(null);
            setErrors({
                cover: 'Gambar tidak dapat dibaca. Pilih gambar lain.',
            });
        };
        image.src = url;
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (busy.current || coverLoading || step === 7) return;
        if (step < 6) {
            const nextErrors = validateEventStep(step, draft);
            setErrors(nextErrors);
            if (!Object.keys(nextErrors).length) setStep(step + 1);
            return;
        }

        for (let index = 0; index < 6; index++) {
            const nextErrors = validateEventStep(index, draft);
            if (Object.keys(nextErrors).length) {
                setStep(index);
                setErrors(nextErrors);
                return;
            }
        }

        busy.current = true;
        setPayment('processing');
        paymentTimer.current = setTimeout(() => {
            busy.current = false;
            setPayment(paymentResult);
            if (paymentResult === 'success') setStep(7);
        }, 600);
    }

    const summary = [
        ['Kategori', draft.category],
        ['Mulai', validSchedule ? dateFormat.format(start) : '-'],
        ['Selesai', validSchedule ? dateFormat.format(end) : '-'],
        ['Zona waktu', timezone],
        ['Visibilitas', draft.visibility === 'private' ? 'Private' : 'Public'],
        [
            'Reveal foto',
            draft.revealMode === 'instant' ? 'Instant' : 'After Event',
        ],
        ['Fotografer', draft.photographers.toLocaleString('id-ID')],
        [
            'Foto per fotografer',
            draft.photosPerPhotographer.toLocaleString('id-ID'),
        ],
        [
            'Kapasitas total',
            `${(draft.photographers * draft.photosPerPhotographer).toLocaleString('id-ID')} foto`,
        ],
    ];

    return (
        <main
            data-event-wizard
            aria-labelledby="event-wizard-title"
            className="min-h-svh bg-background px-5 py-6 text-foreground sm:py-10"
        >
            <div className="mx-auto w-full max-w-120">
               
                <header className="mb-8 text-center">
                    <h1
                        id="event-wizard-title"
                        ref={heading}
                        tabIndex={-1}
                        className="font-serif text-4xl leading-tight outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-5xl"
                    >
                        {steps[step].title}
                    </h1>
                    <p className="mx-auto mt-3 max-w-96 text-sm leading-6 text-muted-foreground">
                        {steps[step].description}
                    </p>
                </header>
                <form
                    ref={form}
                    onSubmit={submit}
                    noValidate
                    aria-busy={processing}
                >
                    <fieldset
                        disabled={processing}
                        className="min-w-0 space-y-6"
                    >
                        <legend className="sr-only">{steps[step].label}</legend>
                        {step === 0 && (
                            <fieldset
                                id="event-category"
                                tabIndex={-1}
                                aria-invalid={!!errors.category}
                                aria-describedby={
                                    errors.category
                                        ? 'event-category-error'
                                        : undefined
                                }
                            >
                                <legend className="sr-only">
                                    Kategori event
                                </legend>
                                <div className="grid grid-cols-2 gap-3">
                                    {eventCategories.map((category) => (
                                        <label
                                            key={category}
                                            className="relative isolate flex aspect-square cursor-pointer items-end overflow-hidden rounded-2xl border-2 border-transparent p-3 has-checked:border-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-ring sm:p-4"
                                        >
                                            <input
                                                type="radio"
                                                name="event-category"
                                                value={category}
                                                checked={
                                                    draft.category === category
                                                }
                                                onChange={() =>
                                                    update({ category })
                                                }
                                                className="sr-only"
                                            />
                                            <img
                                                src={wizardAssets[category]}
                                                alt=""
                                                className="absolute inset-0 -z-20 size-full object-cover"
                                            />
                                            <span className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                                            <span className="text-sm font-semibold text-white">
                                                {category}
                                            </span>
                                            {draft.category === category && (
                                                <span className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                    <Check
                                                        size={16}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            )}
                                        </label>
                                    ))}
                                </div>
                                {errors.category && (
                                    <p
                                        id="event-category-error"
                                        role="alert"
                                        className="mt-3 text-sm text-destructive-foreground"
                                    >
                                        {errors.category}
                                    </p>
                                )}
                            </fieldset>
                        )}
                        {step === 1 && (
                            <>
                                <div className="space-y-3">
                                    <Label htmlFor="event-name">
                                        Nama event
                                    </Label>
                                    <Input
                                        id="event-name"
                                        className="min-h-12 rounded-xl border-muted-foreground/70 text-base"
                                        placeholder="Contoh: Pernikahan Rani dan Bima"
                                        value={draft.name}
                                        onChange={(event) =>
                                            update({ name: event.target.value })
                                        }
                                        aria-invalid={!!errors.name}
                                        aria-describedby={
                                            errors.name
                                                ? 'event-name-error'
                                                : undefined
                                        }
                                        autoComplete="off"
                                        required
                                    />
                                    {errors.name && (
                                        <p
                                            id="event-name-error"
                                            role="alert"
                                            className="text-sm"
                                        >
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="event-cover">
                                        Foto sampul
                                    </Label>
                                    {coverUrl ? (
                                        <img
                                            src={coverUrl}
                                            alt="Pratinjau sampul event"
                                            className="aspect-[4/3] w-full rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="relative isolate flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-muted-foreground/70 p-6 text-center text-white">
                                            <img
                                                src={
                                                    wizardAssets[draft.category]
                                                }
                                                alt=""
                                                className="absolute inset-0 -z-20 size-full object-cover"
                                            />
                                            <span className="absolute inset-0 -z-10 bg-black/70" />
                                            <ImagePlus
                                                size={28}
                                                aria-hidden="true"
                                            />
                                            <p className="text-sm">
                                                Pilih sampulmu. Gambar ini hanya
                                                ilustrasi.
                                            </p>
                                        </div>
                                    )}
                                    <Input
                                        id="event-cover"
                                        type="file"
                                        accept="image/*"
                                        className="h-auto min-h-12 border-muted-foreground/70 py-3"
                                        onChange={(event) =>
                                            selectCover(
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                        aria-invalid={!!errors.cover}
                                        aria-describedby={
                                            errors.cover
                                                ? 'event-cover-error'
                                                : undefined
                                        }
                                        required={!draft.cover}
                                    />
                                    {draft.cover && (
                                        <p className="text-sm break-all text-muted-foreground">
                                            {draft.cover.name}
                                        </p>
                                    )}
                                    {coverLoading && (
                                        <p
                                            role="status"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Memeriksa foto sampul...
                                        </p>
                                    )}
                                    {errors.cover && (
                                        <p
                                            id="event-cover-error"
                                            role="alert"
                                            className="text-sm"
                                        >
                                            {errors.cover}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div
                                    id="event-date"
                                    tabIndex={-1}
                                    aria-invalid={!!errors.startDate}
                                    aria-describedby={
                                        errors.startDate
                                            ? 'event-date-error'
                                            : undefined
                                    }
                                    className="rounded-2xl border border-border bg-card p-2"
                                >
                                    <p className="px-3 pt-3 text-sm font-semibold">
                                        Tanggal mulai
                                    </p>
                                    <Calendar
                                        mode="single"
                                        locale={id}
                                        selected={
                                            draft.startDate
                                                ? new Date(
                                                      draft.startDate +
                                                          'T12:00',
                                                  )
                                                : undefined
                                        }
                                        onSelect={(date) =>
                                            update({
                                                startDate: date
                                                    ? toEventDate(date)
                                                    : '',
                                            })
                                        }
                                        disabled={{
                                            before: new Date(
                                                new Date().setHours(0, 0, 0, 0),
                                            ),
                                        }}
                                        className="w-full"
                                        classNames={{
                                            day: 'relative aspect-square w-full p-0 text-center',
                                            weekday:
                                                'flex-1 text-xs text-muted-foreground',
                                            week: 'mt-1 flex w-full',
                                        }}
                                    />
                                </div>
                                {errors.startDate && (
                                    <p
                                        id="event-date-error"
                                        role="alert"
                                        className="text-sm text-destructive-foreground"
                                    >
                                        {errors.startDate}
                                    </p>
                                )}
                                <fieldset
                                    aria-describedby={
                                        errors.startTime
                                            ? 'event-time-error'
                                            : undefined
                                    }
                                >
                                    <legend className="mb-3 text-sm font-semibold">
                                        Jam mulai (24 jam)
                                    </legend>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(['hour', 'minute'] as const).map(
                                            (part) => (
                                                <div
                                                    key={part}
                                                    className="space-y-2"
                                                >
                                                    <Label
                                                        htmlFor={`event-${part}`}
                                                    >
                                                        {part === 'hour'
                                                            ? 'Jam'
                                                            : 'Menit'}
                                                    </Label>
                                                    <select
                                                        id={`event-${part}`}
                                                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-base focus-visible:outline-2 focus-visible:outline-ring"
                                                        value={
                                                            draft.startTime.split(
                                                                ':',
                                                            )[
                                                                part === 'hour'
                                                                    ? 0
                                                                    : 1
                                                            ] ?? ''
                                                        }
                                                        aria-invalid={
                                                            !!errors.startTime
                                                        }
                                                        aria-describedby={
                                                            errors.startTime
                                                                ? 'event-time-error'
                                                                : undefined
                                                        }
                                                        onChange={(event) => {
                                                            const [
                                                                hour = '',
                                                                minute = '',
                                                            ] =
                                                                draft.startTime.split(
                                                                    ':',
                                                                );
                                                            update({
                                                                startTime:
                                                                    part ===
                                                                    'hour'
                                                                        ? `${event.target.value}:${minute || '00'}`
                                                                        : `${hour || '00'}:${event.target.value}`,
                                                            });
                                                        }}
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Pilih{' '}
                                                            {part === 'hour'
                                                                ? 'jam'
                                                                : 'menit'}
                                                        </option>
                                                        {Array.from(
                                                            {
                                                                length:
                                                                    part ===
                                                                    'hour'
                                                                        ? 24
                                                                        : 60,
                                                            },
                                                            (_, index) =>
                                                                String(
                                                                    index,
                                                                ).padStart(
                                                                    2,
                                                                    '0',
                                                                ),
                                                        ).map((value) => (
                                                            <option
                                                                key={value}
                                                                value={value}
                                                            >
                                                                {value}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                    {errors.startTime && (
                                        <p
                                            id="event-time-error"
                                            role="alert"
                                            className="mt-3 text-sm text-destructive-foreground"
                                        >
                                            {errors.startTime}
                                        </p>
                                    )}
                                </fieldset>
                                <div
                                    className="rounded-2xl bg-card p-5"
                                    aria-live="polite"
                                >
                                    <p className="text-xs font-semibold text-primary">
                                        24 jam bersama
                                    </p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Selesai otomatis
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {validSchedule
                                            ? dateFormat.format(end)
                                            : 'Pilih tanggal dan jam mulai dahulu'}
                                    </p>
                                    <p className="mt-3 text-xs leading-5 break-words text-muted-foreground">
                                        Zona waktu: {timezone}. Jadwal terkunci
                                        setelah event mulai.
                                    </p>
                                </div>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <div
                                    aria-hidden="true"
                                    className="mx-auto w-56 overflow-hidden rounded-3xl border-4 border-border bg-card p-3 shadow-xl"
                                >
                                    <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-muted-foreground/40" />
                                    <img
                                        src={
                                            coverUrl ||
                                            wizardAssets[draft.category]
                                        }
                                        alt=""
                                        className="aspect-video w-full rounded-xl object-cover"
                                    />
                                    <p className="mt-3 truncate text-sm font-semibold">
                                        {draft.name || 'Album event'}
                                    </p>
                                    <p className="mt-1 mb-3 text-xs text-muted-foreground">
                                        {draft.visibility === 'private'
                                            ? 'Foto milikmu'
                                            : 'Album bersama'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <img
                                            src={wizardAssets.Gathering}
                                            alt=""
                                            className="aspect-square rounded-lg object-cover"
                                        />
                                        {draft.visibility === 'public' ? (
                                            <img
                                                src={wizardAssets.Perjalanan}
                                                alt=""
                                                className="aspect-square rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
                                                <span className="text-xs text-muted-foreground">
                                                    Private
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-3 text-center text-xs text-muted-foreground">
                                        Ilustrasi visibilitas album
                                    </p>
                                </div>
                                <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
                                    <Label
                                        htmlFor="event-visibility"
                                        className="text-base"
                                    >
                                        Album Public
                                    </Label>
                                    <Switch
                                        id="event-visibility"
                                        checked={draft.visibility === 'public'}
                                        onCheckedChange={(checked) =>
                                            update({
                                                visibility: checked
                                                    ? 'public'
                                                    : 'private',
                                            })
                                        }
                                        aria-invalid={!!errors.visibility}
                                        aria-describedby="event-visibility-description"
                                    />
                                </div>
                                <p
                                    id="event-visibility-description"
                                    className="text-center text-sm leading-6 text-muted-foreground"
                                >
                                    {draft.visibility === 'private'
                                        ? 'Private: fotografer hanya melihat foto miliknya sendiri. Host melihat seluruh foto.'
                                        : 'Public: foto fotografer lain dapat terlihat sesuai pengaturan reveal. Host melihat seluruh foto.'}
                                </p>
                                {errors.visibility && (
                                    <p
                                        role="alert"
                                        className="text-sm text-destructive-foreground"
                                    >
                                        {errors.visibility}
                                    </p>
                                )}
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <div
                                    className="grid grid-cols-2 gap-3"
                                    aria-label="Ilustrasi foto peserta lain"
                                >
                                    {[
                                        wizardAssets.Gathering,
                                        wizardAssets.Perjalanan,
                                    ].map((src) => (
                                        <div
                                            key={src}
                                            className="relative isolate overflow-hidden rounded-2xl"
                                        >
                                            <img
                                                src={src}
                                                alt="Ilustrasi foto peserta lain"
                                                className={`aspect-[3/4] w-full object-cover ${draft.revealMode === 'after-event' ? 'blur-lg' : ''}`}
                                            />
                                            {draft.revealMode ===
                                                'after-event' && (
                                                <span className="absolute inset-0 flex items-center justify-center bg-black/60 px-3 text-center text-sm font-medium text-white">
                                                    Terlihat setelah event
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <Choices
                                    id="event-reveal"
                                    label="Aturan reveal foto"
                                    value={draft.revealMode}
                                    options={[
                                        {
                                            value: 'instant',
                                            label: 'Instant',
                                            description:
                                                'Foto orang lain tampil di album Public setelah berhasil diproses.',
                                        },
                                        {
                                            value: 'after-event',
                                            label: 'After Event',
                                            description:
                                                'Foto orang lain tampil di album Public setelah periode event selesai.',
                                        },
                                    ]}
                                    error={errors.revealMode}
                                    onChange={(revealMode) =>
                                        update({
                                            revealMode:
                                                revealMode as HostEventDraft['revealMode'],
                                        })
                                    }
                                />
                                {draft.visibility === 'private' && (
                                    <p className="rounded-xl bg-card p-5 text-sm leading-6 text-muted-foreground">
                                        Album Private tetap hanya menampilkan
                                        foto milik fotografer sendiri, apa pun
                                        pilihan reveal.
                                    </p>
                                )}
                            </>
                        )}
                        {step === 5 && (
                            <>
                                <Choices
                                    id="event-plan"
                                    label="Pilihan kapasitas"
                                    value={String(draft.photographers)}
                                    options={previewPlans.map((option) => ({
                                        value: String(option.photographers),
                                        label: `${option.photographers} fotografer`,
                                        description: `${option.photosPerPhotographer} foto per fotografer. Estimasi ${money(option.price)}.`,
                                    }))}
                                    error={
                                        errors.photographers ??
                                        errors.photosPerPhotographer
                                    }
                                    onChange={(value) => {
                                        const option = previewPlans.find(
                                            (item) =>
                                                item.photographers ===
                                                Number(value),
                                        );
                                        if (option)
                                            update({
                                                photographers:
                                                    option.photographers,
                                                photosPerPhotographer:
                                                    option.photosPerPhotographer,
                                            });
                                    }}
                                />
                                <div className="rounded-xl bg-card p-5">
                                    <p className="text-sm text-muted-foreground">
                                        Kapasitas foto maksimum
                                    </p>
                                    <output
                                        className="mt-2 block text-2xl font-semibold"
                                        aria-live="polite"
                                    >
                                        {(
                                            draft.photographers *
                                            draft.photosPerPhotographer
                                        ).toLocaleString('id-ID')}{' '}
                                        foto
                                    </output>
                                </div>
                                <p className="text-sm leading-6 text-muted-foreground">
                                    Kuota dan harga belum terhubung ke katalog
                                    server. Pilihan ini tidak menetapkan harga
                                    produksi.
                                </p>
                            </>
                        )}
                        {step >= 6 && (
                            <>
                                <section
                                    aria-label="Ringkasan event"
                                    className="overflow-hidden rounded-xl border bg-card"
                                >
                                    {coverUrl && (
                                        <img
                                            src={coverUrl}
                                            alt="Sampul event"
                                            className="aspect-video max-h-64 w-full object-cover"
                                        />
                                    )}
                                    <div className="p-5 sm:p-8">
                                        <h2 className="mb-6 text-2xl font-semibold break-words">
                                            {draft.name.trim()}
                                        </h2>
                                        <dl className="grid grid-cols-2 gap-5">
                                            {summary.map(([label, value]) => (
                                                <div
                                                    key={label}
                                                    className="min-w-0"
                                                >
                                                    <dt className="text-sm text-muted-foreground">
                                                        {label}
                                                    </dt>
                                                    <dd className="mt-1 font-medium break-words">
                                                        {value}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </section>
                                {step === 6 && (
                                    <>
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <span className="text-muted-foreground">
                                                Estimasi total
                                            </span>
                                            <strong className="text-2xl">
                                                {plan ? money(plan.price) : '-'}
                                            </strong>
                                        </div>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            Checkout belum terhubung ke payment
                                            gateway. Tidak ada transaksi,
                                            pembayaran, atau event aktif yang
                                            dibuat.
                                        </p>
                                        <div className="space-y-3">
                                            <Label htmlFor="payment-result">
                                                Hasil checkout untuk pratinjau
                                            </Label>
                                            <select
                                                id="payment-result"
                                                className="min-h-12 w-full rounded-md border border-muted-foreground/70 bg-background px-3 text-sm focus-visible:outline-2 focus-visible:outline-ring"
                                                value={paymentResult}
                                                onChange={(event) =>
                                                    setPaymentResult(
                                                        event.target
                                                            .value as PaymentResult,
                                                    )
                                                }
                                            >
                                                <option value="pending">
                                                    Menunggu pembayaran
                                                </option>
                                                <option value="failed">
                                                    Pembayaran gagal
                                                </option>
                                                <option value="expired">
                                                    Pembayaran kedaluwarsa
                                                </option>
                                                <option value="success">
                                                    Pembayaran berhasil
                                                </option>
                                            </select>
                                        </div>
                                        {payment !== 'idle' && (
                                            <div
                                                role={
                                                    payment === 'failed' ||
                                                    payment === 'expired'
                                                        ? 'alert'
                                                        : 'status'
                                                }
                                                className="rounded-xl bg-card p-5 text-sm leading-6"
                                            >
                                                {payment === 'processing'
                                                    ? 'Memproses pratinjau checkout...'
                                                    : payment === 'pending'
                                                      ? 'Pembayaran menunggu. Kamu dapat memilih hasil lain dan mencoba lagi.'
                                                      : payment === 'failed'
                                                        ? 'Pembayaran gagal. Data event tetap tersimpan selama wizard ini terbuka. Coba lagi.'
                                                        : payment === 'expired'
                                                          ? 'Pembayaran kedaluwarsa. Kamu dapat mencoba checkout kembali.'
                                                          : 'Pratinjau pembayaran berhasil.'}
                                            </div>
                                        )}
                                    </>
                                )}
                                {step === 7 && (
                                    <div className="space-y-4 rounded-xl bg-card p-5 sm:p-8">
                                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                                            <Check
                                                size={20}
                                                aria-hidden="true"
                                            />
                                            Pratinjau checkout selesai
                                        </h2>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            Ini bukan konfirmasi pembayaran dari
                                            server. Event belum diaktifkan.
                                        </p>
                                        <div className="rounded-lg border border-dashed border-muted-foreground/70 p-5">
                                            <h3 className="font-semibold">
                                                Link dan QR event
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                Link dan QR akan tersedia
                                                setelah backend membuat event
                                                dan memverifikasi pembayaran.
                                                Belum ada link yang bisa
                                                dibagikan.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </fieldset>
                    <div
                        className="mt-8 flex justify-center gap-2"
                        aria-hidden="true"
                    >
                        {steps.map((item, index) => (
                            <span
                                key={item.label}
                                className={`h-1.5 rounded-full ${step === index ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/40'}`}
                            />
                        ))}
                    </div>
                    <footer className="mt-6 flex items-center justify-between gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="min-h-12 px-5"
                            disabled={step === 0 || processing}
                            onClick={() => {
                                setErrors({});
                                setStep(step - 1);
                            }}
                        >
                            <ArrowLeft aria-hidden="true" />
                            Kembali
                        </Button>
                        {step < 7 ? (
                            <Button
                                type="submit"
                                className="min-h-12 flex-1 rounded-full px-5"
                                disabled={processing || coverLoading}
                            >
                                {processing ? (
                                    <>
                                        <LoaderCircle
                                            className="animate-spin motion-reduce:animate-none"
                                            aria-hidden="true"
                                        />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        {step < 6
                                            ? 'Lanjutkan'
                                            : payment === 'failed' ||
                                                payment === 'expired'
                                              ? 'Coba checkout lagi'
                                              : 'Pratinjau checkout'}
                                        <ArrowRight aria-hidden="true" />
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button asChild className="min-h-12 px-5">
                                <Link href={dashboard()}>
                                    Kembali ke dashboard
                                </Link>
                            </Button>
                        )}
                    </footer>
                    <p className="mt-5 text-xs leading-5 text-muted-foreground">
                        Input bertahan saat berpindah langkah. Refresh atau
                        meninggalkan wizard akan menghapus input; penyimpanan
                        draft belum tersedia.
                    </p>
                </form>
            </div>
        </main>
    );
}
