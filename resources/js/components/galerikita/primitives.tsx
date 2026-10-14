import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import {
    Aperture,
    ArrowUpRight,
    Camera,
    Check,
    ChevronRight,
    Image,
    LockKeyhole,
    Wifi,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { home, register } from '@/routes';

export function Brand() {
    return (
        <a
            href="#beranda"
            className="inline-flex items-center gap-2 text-[27px] font-semibold tracking-[-1px] whitespace-nowrap [@media(width<=768px)]:text-[23px]"
            aria-label="GaleriKita beranda"
        >
            <Aperture
                className="h-7.75 w-7.75 text-[#e3e8b4] [@media(width<=768px)]:h-6.75 [@media(width<=768px)]:w-6.75"
                aria-hidden="true"
            />
            <span>GaleriKita.</span>
        </a>
    );
}

export function EventLink({
    children = 'Buat Event Sekarang',
    className = '',
    iconClassName = '',
}: {
    children?: ReactNode;
    className?: string;
    iconClassName?: string;
}) {
    const { auth } = usePage().props;
    return (
        <Link
            data-create-event
            href={
                auth.user ? home({ query: { 'create-event': 1 } }) : register()
            }
            className={cn(
                'inline-flex min-h-13.5 items-center justify-center gap-2 rounded-full border border-transparent bg-primary px-7 py-3.5 text-[15px] font-bold whitespace-nowrap text-primary-foreground transition-[background,border-color] duration-150 ease-[ease] hover:bg-[#cbe85a]',
                className,
            )}
        >
            {children}
            <ArrowUpRight
                className={iconClassName}
                size={17}
                aria-hidden="true"
            />
        </Link>
    );
}

export function Photo({
    src,
    name,
    className = '',
    eager = false,
}: {
    src: string;
    name: string;
    className?: string;
    eager?: boolean;
}) {
    return (
        <img
            src={src}
            alt=""
            data-photo={name}
            className={cn('block h-full w-full object-cover', className)}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            width={800}
            height={600}
        />
    );
}

export function Print({
    src,
    name,
    className = '',
    eager = false,
}: Parameters<typeof Photo>[0]) {
    return (
        <div
            className={cn(
                'border border-[#b2b2ab] bg-[#e0dfd7] p-1.25 pb-6.5 shadow-[0_8px_24px_#0000003d]',
                className,
            )}
        >
            <Photo src={src} name={name} eager={eager} />
        </div>
    );
}

export function SectionHeading({
    label,
    children,
    description,
    headingClassName = '',
    descriptionClassName = '',
    eyebrowClassName = '',
}: {
    label: string;
    children: ReactNode;
    description?: string;
    headingClassName?: string;
    descriptionClassName?: string;
    eyebrowClassName?: string;
}) {
    return (
        <div>
            <p
                className={cn(
                    'mb-3.5! text-[12px] font-bold tracking-[2px] text-muted-foreground [@media(width<=768px)]:text-[10px] [@media(width<=768px)]:tracking-[1.6px]',
                    eyebrowClassName,
                )}
            >
                {label}
            </p>
            <h2
                className={cn(
                    'm-0 font-serif text-[70px] leading-[0.9] font-normal tracking-[-0.6px] min-[769px]:[@media(width<=1100px)]:text-[56px] [@media(width<=768px)]:text-[49px] [@media(width<=768px)]:tracking-[-1.3px]',
                    headingClassName,
                )}
            >
                {children}
            </h2>
            {description && (
                <p
                    className={cn(
                        'mt-4 text-[18px] leading-[1.45] text-muted-foreground [@media(width<=768px)]:text-[15px]',
                        descriptionClassName,
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
}

export function QrIllustration({ className = '' }: { className?: string }) {
    const finder = (column: number, row: number) => {
        for (const [left, top] of [
            [0, 0],
            [22, 0],
            [0, 22],
        ]) {
            if (
                column >= left &&
                column < left + 7 &&
                row >= top &&
                row < top + 7
            ) {
                const horizontal = column - left;
                const vertical = row - top;
                return (
                    horizontal === 0 ||
                    horizontal === 6 ||
                    vertical === 0 ||
                    vertical === 6 ||
                    (horizontal >= 2 &&
                        horizontal <= 4 &&
                        vertical >= 2 &&
                        vertical <= 4)
                );
            }
            if (
                column >= left - 1 &&
                column <= left + 7 &&
                row >= top - 1 &&
                row <= top + 7
            )
                return false;
        }
        return (column * 17 + row * 31 + column * row * 7) % 13 < 6;
    };
    return (
        <svg
            className={cn('block aspect-square h-auto w-full', className)}
            viewBox="-2 -2 33 33"
            aria-hidden="true"
        >
            <rect x="-2" y="-2" width="33" height="33" fill="#f5f4ef" />
            {Array.from({ length: 29 * 29 }, (_, index) => {
                const column = index % 29;
                const row = Math.floor(index / 29);
                return finder(column, row) ? (
                    <rect
                        key={index}
                        x={column}
                        y={row}
                        width={1}
                        height={1}
                        fill="#101011"
                    />
                ) : null;
            })}
        </svg>
    );
}

export function Invitation({
    compact = false,
    className = '',
}: {
    compact?: boolean;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'h-88.75 w-58 transform-[rotate(-4deg)] rounded-[12px] border border-[#434347] bg-[linear-gradient(150deg,_#1a1a1d,_#101012)] px-5.25 py-6.75 text-center',
                compact &&
                    'absolute top-5.75 left-11.75 h-54.75 w-42 transform-[rotate(-7deg)] px-3.75 py-5.25 min-[769px]:[@media(width<=1300px)]:left-6 [@media(width<=768px)]:left-7.5',
                className,
            )}
            aria-hidden="true"
        >
            {!compact && (
                <>
                    <small className="text-[10px] text-[#81816f]">Event</small>
                    <strong className="mx-0 mt-2 mb-1 block text-[15px] font-medium">
                        Pernikahan Andi &amp; Sari
                    </strong>
                    <span className="text-[12px]">14 Juni 2025</span>
                </>
            )}
            <QrIllustration
                className={cn(
                    'mx-auto mt-6.25 mb-3.75 w-38.75 rounded-[5px] [@media(width<=768px)]:w-33.75',
                    compact &&
                        'mx-auto mt-2 mb-3 w-24.75 [@media(width<=768px)]:w-24.75',
                )}
            />
            <p
                className={cn(
                    'text-[14px]',
                    compact && 'text-[15px] font-semibold text-primary',
                )}
            >
                {compact ? (
                    <>
                        Tanpa akun
                        <br />
                        untuk peserta.
                    </>
                ) : (
                    'Scan untuk bergabung'
                )}
            </p>
        </div>
    );
}

export function Phone({
    camera,
    name,
    className = '',
    photoClassName = '',
    cameraToolsClassName = '',
    joinClassName = '',
    phoneTopClassName = '',
    notchClassName = '',
    shutterClassName = '',
    shutterRowClassName = '',
    cameraHintClassName = '',
}: {
    camera?: string;
    name?: string;
    className?: string;
    photoClassName?: string;
    cameraToolsClassName?: string;
    joinClassName?: string;
    phoneTopClassName?: string;
    notchClassName?: string;
    shutterClassName?: string;
    shutterRowClassName?: string;
    cameraHintClassName?: string;
}) {
    return (
        <div
            className={cn(
                'relative h-97.75 w-48.75 shrink-0 overflow-hidden rounded-[29px] border-2 border-[#a6a6a8] bg-[#111113] p-2.25 shadow-[inset_0_0_0_4px_#050506,_0_0_0_2px_#28282a]',
                className,
            )}
            aria-hidden="true"
        >
            <div
                className={cn(
                    'flex h-5 items-center justify-between px-2.25 py-0 text-[8px]',
                    phoneTopClassName,
                )}
            >
                <span>9:41</span>
                <i
                    className={cn(
                        'h-3 w-13.75 rounded-[20px] bg-[#050506]',
                        notchClassName,
                    )}
                />
                <Wifi size={11} />
            </div>
            {camera ? (
                <>
                    <Photo
                        src={camera}
                        name={name ?? 'camera'}
                        className={cn(
                            'mt-1.25 h-70.25 rounded-[4px]',
                            '[@media(width<=768px)]:h-62.5',
                            photoClassName,
                        )}
                    />
                    <div
                        className={cn(
                            'mt-2 flex justify-center gap-4.25 text-[7px] text-[#aaa]',
                            cameraToolsClassName,
                        )}
                    >
                        <span>Potret</span>
                        <span className="nth-[2]:text-primary">Foto</span>
                        <span>Video</span>
                    </div>
                    <div
                        className={cn(
                            'flex items-center justify-between px-1.5 pt-2.25 pb-0',
                            shutterRowClassName,
                        )}
                    >
                        <Image size={18} />
                        <i
                            className={cn(
                                'h-9.25 w-9.25 rounded-[50%] border-3 border-[#111] bg-[#eeeee9] outline-1 outline-[#ccc] outline-solid',
                                shutterClassName,
                            )}
                        />
                        <Camera size={18} />
                    </div>
                </>
            ) : (
                <>
                    <div className="mt-1.25 flex h-5.5 items-center gap-1 rounded-[10px] bg-[#242427] pl-2 text-[8px] text-[#aaa]">
                        <LockKeyhole size={8} /> galerikita.join
                    </div>
                    <div className={cn('mt-9.5 text-center', joinClassName)}>
                        <Aperture className="mx-auto mt-0 mb-4.5 h-8.5 w-8.5 text-primary" />
                        <strong
                            className={cn(
                                'text-[15px] font-medium',
                                cameraHintClassName,
                            )}
                        >
                            Gabung ke Galeri
                        </strong>
                        <p className="mt-2 text-[10px] leading-[1.4] text-[#b1b1b8]">
                            Masukkan nama kamu
                            <br />
                            untuk mulai berbagi foto.
                        </p>
                        <div className="mt-5.75 rounded-[5px] border border-[#505054] bg-[#202023] px-2 py-3 text-left text-[10px] text-[#b1b1b8]">
                            Nama kamu
                        </div>
                        <div className="mt-2.25 rounded-[5px] bg-primary px-1.25 py-2.75 text-[10px] font-bold text-[#121506]">
                            Gabung Sekarang
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export function GalleryPreview({
    photos,
    className = '',
    previewGridClassName = '',
}: {
    photos: { src: string; name: string }[];
    className?: string;
    previewGridClassName?: string;
}) {
    return (
        <div
            className={cn(
                'absolute top-1.25 right-0 h-95.75 w-49.5 rounded-[12px] border border-[#333] bg-[#161618] p-2.5 pt-4',
                className,
            )}
            aria-hidden="true"
        >
            <strong className="text-[12px] font-semibold">Galeri Acara</strong>
            <div className="mx-0 my-4 flex gap-5 text-[10px]">
                <span className="first:border-b first:border-b-primary first:pb-1 first:text-primary">
                    Semua
                </span>
                <span>Foto</span>
                <span>Video</span>
            </div>
            <div
                className={cn(
                    'grid h-71.75 grid-cols-2 grid-rows-[repeat(3,_1fr)] gap-1.25',
                    previewGridClassName,
                )}
            >
                {photos.map((photo) => (
                    <Photo
                        className="rounded-[4px]"
                        key={photo.name}
                        {...photo}
                    />
                ))}
            </div>
        </div>
    );
}

export function PrivacyPreview() {
    return (
        <div
            className="p-5 pt-7 [@media(width<=768px)]:pt-3"
            aria-hidden="true"
        >
            <div className="rounded-[10px] border border-border px-5 py-3">
                <div className="flex items-center gap-4.5 px-0 py-2">
                    <LockKeyhole size={22} />
                    <p>
                        <strong className="block text-[13px] font-semibold">
                            Private
                        </strong>
                        <span className="mt-1 block text-[11px] text-muted-foreground">
                            Hanya undangan yang bisa melihat
                        </span>
                    </p>
                </div>
                <div className="flex items-center gap-4.5 px-0 py-2">
                    <Check
                        className="rounded-[50%] bg-primary fill-primary p-0.75 text-[#101207]"
                        size={22}
                    />
                    <p>
                        <strong className="block text-[13px] font-semibold">
                            Public
                        </strong>
                        <span className="mt-1 block text-[11px] text-muted-foreground">
                            Siapa saja dengan link dapat melihat
                        </span>
                    </p>
                </div>
            </div>
            <div className="mt-3.75 grid grid-cols-2 gap-3.25">
                <div className="rounded-[7px] border border-border px-3.25 py-2.5 first:bg-primary first:text-primary-foreground">
                    <strong className="block text-[13px] font-semibold">
                        Instant
                    </strong>
                    <span className="mt-1 block text-[11px] text-[#333c11]">
                        Langsung ditampilkan
                    </span>
                </div>
                <div className="rounded-[7px] border border-border px-3.25 py-2.5">
                    <strong className="block text-[13px] font-semibold">
                        After Event
                    </strong>
                    <span className="mt-1 block text-[11px] text-muted-foreground">
                        Ditampilkan setelah acara
                    </span>
                </div>
            </div>
        </div>
    );
}

export function DirectionIcons() {
    return (
        <div className="flex gap-3" aria-hidden="true">
            <span className="flex h-11.5 w-11.5 items-center justify-center rounded-[50%] border border-[#49494d] text-foreground first:border-border first:text-[#73737b] [@media(width<=768px)]:h-9.5 [@media(width<=768px)]:w-9.5">
                <ChevronRight
                    className="transform-[rotate(180deg)]"
                    size={18}
                />
            </span>
            <span className="flex h-11.5 w-11.5 items-center justify-center rounded-[50%] border border-[#49494d] text-foreground [@media(width<=768px)]:h-9.5 [@media(width<=768px)]:w-9.5">
                <ChevronRight size={18} />
            </span>
        </div>
    );
}
