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
import { dashboard, register } from '@/routes';

export function Brand() {
    return (
        <a
            href="#beranda"
            className="gk-brand inline-flex items-center gap-2 text-[27px] font-semibold tracking-[-1px] whitespace-nowrap gk-mobile:text-[23px] [&_>_svg]:h-[31px] [&_>_svg]:w-[31px] [&_>_svg]:text-[#e3e8b4] gk-mobile:[&_>_svg]:h-[27px] gk-mobile:[&_>_svg]:w-[27px]"
            aria-label="GaleriKita beranda"
        >
            <Aperture aria-hidden="true" />
            <span>GaleriKita.</span>
        </a>
    );
}

export function EventLink({
    children = 'Buat Event Sekarang',
    className = '',
}: {
    children?: ReactNode;
    className?: string;
}) {
    const { auth } = usePage().props;
    return (
        <Link
            data-create-event
            href={auth.user ? dashboard() : register()}
            className={cn(
                `gk-button inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[999px] p-[14px_28px] text-[15px] font-bold whitespace-nowrap text-[#171b08] [background:var(--color-gk-accent)] [border:1px_solid_transparent] [transition:background_0.15s,_border-color_0.15s] [&:hover]:[background:#cbe85a] ${className}`,
            )}
        >
            {children}
            <ArrowUpRight size={17} aria-hidden="true" />
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
            className={cn(
                `gk-photo block h-[100%] w-[100%] object-cover ${className}`,
            )}
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
                `gk-print p-[5px_5px_26px] [box-shadow:0_8px_24px_#0000003d] [background:#e0dfd7] [border:1px_solid_#b2b2ab] ${className}`,
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
}: {
    label: string;
    children: ReactNode;
    description?: string;
}) {
    return (
        <div className="gk-section-heading">
            <p className="gk-eyebrow mb-[14px]! text-[12px] font-bold tracking-[2px] text-gk-secondary gk-mobile:text-[10px] gk-mobile:tracking-[1.6px]">
                {label}
            </p>
            <h2 className="m-[0] font-gk-display text-[70px] leading-[0.9] font-normal tracking-[-0.6px] gk-small:text-[56px] gk-mobile:text-[49px] gk-mobile:tracking-[-1.3px]">
                {children}
            </h2>
            {description && (
                <p className="gk-description mt-[16px] text-[18px] leading-[1.45] text-gk-secondary gk-mobile:text-[15px]">
                    {description}
                </p>
            )}
        </div>
    );
}

export function QrIllustration() {
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
            className="gk-qr block aspect-[1] h-[auto] w-[100%]"
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

export function Invitation({ compact = false }: { compact?: boolean }) {
    return (
        <div
            className={cn(
                `gk-invitation h-[355px] w-[232px] [transform:rotate(-4deg)] rounded-[12px] p-[27px_21px] text-center [background:linear-gradient(150deg,_#1a1a1d,_#101012)] [border:1px_solid_#434347] [&_.gk-qr]:m-[25px_auto_15px] [&_.gk-qr]:w-[155px] [&_.gk-qr]:rounded-[5px] [&_>_span]:text-[12px] [&_p]:text-[14px] [&_small]:text-[10px] [&_small]:text-[#81816f] [&_strong]:m-[8px_0_4px] [&_strong]:block [&_strong]:text-[15px] [&_strong]:font-medium ${compact ? 'gk-invitation-compact absolute top-[23px] left-[47px] h-[219px] w-[168px] [transform:rotate(-7deg)] p-[21px_15px] gk-compact:left-[24px] gk-mobile:left-[30px] [&_.gk-qr]:m-[8px_auto_12px] [&_.gk-qr]:w-[99px] [&_p]:text-[15px] [&_p]:font-semibold [&_p]:text-gk-accent' : ''}`,
            )}
            aria-hidden="true"
        >
            {!compact && (
                <>
                    <small>Event</small>
                    <strong>Pernikahan Andi &amp; Sari</strong>
                    <span>14 Juni 2025</span>
                </>
            )}
            <QrIllustration />
            <p>
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
}: {
    camera?: string;
    name?: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                `gk-phone relative h-[391px] w-[195px] shrink-[0] overflow-hidden rounded-[29px] p-[9px] [box-shadow:inset_0_0_0_4px_#050506,_0_0_0_2px_#28282a] [background:#111113] [border:2px_solid_#a6a6a8] ${className}`,
            )}
            aria-hidden="true"
        >
            <div className="gk-phone-top flex h-[20px] items-center justify-between p-[0_9px] text-[8px] [&_i]:h-[12px] [&_i]:w-[55px] [&_i]:rounded-[20px] [&_i]:[background:#050506]">
                <span>9:41</span>
                <i />
                <Wifi size={11} />
            </div>
            {camera ? (
                <>
                    <Photo
                        src={camera}
                        name={name ?? 'camera'}
                        className="gk-camera-image mt-[5px] h-[281px] rounded-[4px]"
                    />
                    <div className="gk-camera-tools mt-[8px] flex justify-center gap-[17px] text-[7px] text-[#aaa] [&_span:nth-child(2)]:text-gk-accent">
                        <span>Potret</span>
                        <span>Foto</span>
                        <span>Video</span>
                    </div>
                    <div className="gk-shutter-row flex items-center justify-between p-[9px_6px_0]">
                        <Image size={18} />
                        <i className="gk-shutter h-[37px] w-[37px] rounded-[50%] [outline:1px_solid_#ccc] [background:#eeeee9] [border:3px_solid_#111]" />
                        <Camera size={18} />
                    </div>
                </>
            ) : (
                <>
                    <div className="gk-phone-url mt-[5px] flex h-[22px] items-center gap-1 rounded-[10px] pl-[8px] text-[8px] text-[#aaa] [background:#242427]">
                        <LockKeyhole size={8} /> galerikita.join
                    </div>
                    <div className="gk-join mt-[38px] text-center [&_>_svg]:m-[0_auto_18px] [&_>_svg]:h-[34px] [&_>_svg]:w-[34px] [&_>_svg]:text-gk-accent [&_p]:mt-[8px] [&_p]:text-[10px] [&_p]:leading-[1.4] [&_p]:text-[#b1b1b8] [&_strong]:text-[15px] [&_strong]:font-medium">
                        <Aperture />
                        <strong>Gabung ke Galeri</strong>
                        <p>
                            Masukkan nama kamu
                            <br />
                            untuk mulai berbagi foto.
                        </p>
                        <div className="gk-name-input mt-[23px] rounded-[5px] p-[12px_8px] text-left text-[10px] text-[#b1b1b8] [background:#202023] [border:1px_solid_#505054]">
                            Nama kamu
                        </div>
                        <div className="gk-join-button mt-[9px] rounded-[5px] p-[11px_5px] text-[10px] font-bold text-[#121506] [background:var(--color-gk-accent)]">
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
}: {
    photos: { src: string; name: string }[];
}) {
    return (
        <div
            className="gk-gallery-preview absolute top-[5px] right-[0] h-[383px] w-[198px] rounded-[12px] p-[16px_10px_10px] [background:#161618] [border:1px_solid_#333] [&_>_strong]:text-[12px] [&_>_strong]:font-semibold"
            aria-hidden="true"
        >
            <strong>Galeri Acara</strong>
            <div className="gk-gallery-tabs m-[16px_0] flex gap-5 text-[10px] [&_span:first-child]:pb-[4px] [&_span:first-child]:text-gk-accent [&_span:first-child]:[border-bottom:1px_solid_var(--color-gk-accent)]">
                <span>Semua</span>
                <span>Foto</span>
                <span>Video</span>
            </div>
            <div className="gk-preview-grid grid h-[287px] grid-cols-[1fr_1fr] grid-rows-[repeat(3,_1fr)] gap-[5px] [&_.gk-photo]:rounded-[4px]">
                {photos.map((photo) => (
                    <Photo key={photo.name} {...photo} />
                ))}
            </div>
        </div>
    );
}

export function PrivacyPreview() {
    return (
        <div
            className="gk-privacy p-[28px_20px_20px] gk-mobile:pt-[12px] [&_span]:mt-[4px] [&_span]:block [&_span]:text-[11px] [&_span]:text-gk-secondary [&_strong]:block [&_strong]:text-[13px] [&_strong]:font-semibold"
            aria-hidden="true"
        >
            <div className="gk-privacy-options rounded-[10px] p-[12px_20px] [border:1px_solid_var(--color-gk-border)] [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-[18px] [&_>_div]:p-[8px_0] [&_>_div:last-child_svg]:rounded-[50%] [&_>_div:last-child_svg]:fill-gk-accent [&_>_div:last-child_svg]:p-[3px] [&_>_div:last-child_svg]:text-[#101207] [&_>_div:last-child_svg]:[background:var(--color-gk-accent)]">
                <div>
                    <LockKeyhole size={22} />
                    <p>
                        <strong>Private</strong>
                        <span>Hanya undangan yang bisa melihat</span>
                    </p>
                </div>
                <div>
                    <Check size={22} />
                    <p>
                        <strong>Public</strong>
                        <span>Siapa saja dengan link dapat melihat</span>
                    </p>
                </div>
            </div>
            <div className="gk-timing-options mt-[15px] grid grid-cols-[1fr_1fr] gap-[13px] [&_>_div]:rounded-[7px] [&_>_div]:p-[10px_13px] [&_>_div]:[border:1px_solid_var(--color-gk-border)] [&_>_div:first-child]:text-[#171b08] [&_>_div:first-child]:[background:var(--color-gk-accent)] [&_>_div:first-child_span]:text-[#333c11]">
                <div>
                    <strong>Instant</strong>
                    <span>Langsung ditampilkan</span>
                </div>
                <div>
                    <strong>After Event</strong>
                    <span>Ditampilkan setelah acara</span>
                </div>
            </div>
        </div>
    );
}

export function DirectionIcons() {
    return (
        <div
            className="gk-directions flex gap-3 [&_>_span]:flex [&_>_span]:h-[46px] [&_>_span]:w-[46px] [&_>_span]:items-center [&_>_span]:justify-center [&_>_span]:rounded-[50%] [&_>_span]:text-gk-text [&_>_span]:[border:1px_solid_#49494d] gk-mobile:[&_>_span]:h-[38px] gk-mobile:[&_>_span]:w-[38px] [&_>_span:first-child]:[border-color:#29292d] [&_>_span:first-child]:text-[#73737b]"
            aria-hidden="true"
        >
            <span>
                <ChevronRight
                    className="gk-back-arrow [transform:rotate(180deg)]"
                    size={18}
                />
            </span>
            <span>
                <ChevronRight size={18} />
            </span>
        </div>
    );
}
