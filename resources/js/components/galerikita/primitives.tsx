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
            className="gk-brand inline-flex items-center gap-2 text-[27px] font-semibold tracking-[-1px] whitespace-nowrap [@media(width<550px)]:text-[23px] min-[550px]:[@media(width<=768px)]:text-[23px]"
            aria-label="GaleriKita beranda"
        >
            <Aperture
                className="h-[31px] w-[31px] text-[#e3e8b4] [@media(width<550px)]:h-[27px] [@media(width<550px)]:w-[27px] min-[550px]:[@media(width<=768px)]:h-[27px] min-[550px]:[@media(width<=768px)]:w-[27px]"
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
            href={auth.user ? dashboard() : register()}
            className={cn(
                `gk-button inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[999px] border border-transparent bg-primary p-[14px_28px] text-[15px] font-bold whitespace-nowrap text-[#171b08] transition-[background,border-color] duration-150 ease-[ease] hover:bg-[#cbe85a]`,
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
            className={cn(
                `gk-photo block h-[100%] w-[100%] object-cover`,
                className,
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
                `gk-print border border-[#b2b2ab] bg-[#e0dfd7] p-[5px_5px_26px] shadow-[0_8px_24px_#0000003d]`,
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
        <div className="gk-section-heading">
            <p
                className={cn(
                    'gk-eyebrow mb-[14px]! text-[12px] font-bold tracking-[2px] text-muted-foreground [@media(width<550px)]:text-[10px] [@media(width<550px)]:tracking-[1.6px] min-[550px]:[@media(width<=768px)]:text-[10px] min-[550px]:[@media(width<=768px)]:tracking-[1.6px]',
                    eyebrowClassName,
                )}
            >
                {label}
            </p>
            <h2
                className={cn(
                    'm-[0] font-serif text-[70px] leading-[0.9] font-normal tracking-[-0.6px] [@media(width<550px)]:text-[49px] [@media(width<550px)]:tracking-[-1.3px] min-[769px]:[@media(width<=1100px)]:text-[56px] min-[550px]:[@media(width<=768px)]:text-[49px] min-[550px]:[@media(width<=768px)]:tracking-[-1.3px]',
                    headingClassName,
                )}
            >
                {children}
            </h2>
            {description && (
                <p
                    className={cn(
                        'gk-description mt-[16px] text-[18px] leading-[1.45] text-muted-foreground [@media(width<550px)]:text-[15px] min-[550px]:[@media(width<=768px)]:text-[15px]',
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
            className={cn(
                'gk-qr block aspect-[1] h-[auto] w-[100%]',
                className,
            )}
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
                `gk-invitation h-[355px] w-[232px] transform-[rotate(-4deg)] rounded-[12px] border border-[#434347] bg-[linear-gradient(150deg,_#1a1a1d,_#101012)] p-[27px_21px] text-center ${compact ? 'gk-invitation-compact absolute top-[23px] left-[47px] h-[219px] w-[168px] transform-[rotate(-7deg)] p-[21px_15px] [@media(width<550px)]:left-[30px] min-[769px]:[@media(width<=1100px)]:left-[24px] min-[550px]:[@media(width<=768px)]:left-[30px] [@media(width>1100px)]:[@media(width<=1300px)]:left-[24px]' : ''}`,
                className,
            )}
            aria-hidden="true"
        >
            {!compact && (
                <>
                    <small className="text-[10px] text-[#81816f]">Event</small>
                    <strong className="m-[8px_0_4px] block text-[15px] font-medium">
                        Pernikahan Andi &amp; Sari
                    </strong>
                    <span className="text-[12px]">14 Juni 2025</span>
                </>
            )}
            <QrIllustration
                className={cn(
                    'm-[25px_auto_15px] w-[155px] rounded-[5px] [@media(width<550px)]:w-[135px] min-[550px]:[@media(width<=768px)]:w-[135px]',
                    compact &&
                        'm-[8px_auto_12px] w-[99px] [@media(width<550px)]:w-[99px] min-[550px]:[@media(width<=768px)]:w-[99px]',
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
                `gk-phone relative h-[391px] w-[195px] shrink-[0] overflow-hidden rounded-[29px] border-[2px] border-[#a6a6a8] bg-[#111113] p-[9px] shadow-[inset_0_0_0_4px_#050506,_0_0_0_2px_#28282a]`,
                className,
            )}
            aria-hidden="true"
        >
            <div
                className={cn(
                    'gk-phone-top flex h-[20px] items-center justify-between p-[0_9px] text-[8px]',
                    phoneTopClassName,
                )}
            >
                <span>9:41</span>
                <i
                    className={cn(
                        'h-[12px] w-[55px] rounded-[20px] bg-[#050506]',
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
                            'gk-camera-image mt-[5px] h-[281px] rounded-[4px]',
                            '[@media(width<550px)]:h-[250px] min-[550px]:[@media(width<=768px)]:h-[250px]',
                            photoClassName,
                        )}
                    />
                    <div
                        className={cn(
                            'gk-camera-tools mt-[8px] flex justify-center gap-[17px] text-[7px] text-[#aaa]',
                            cameraToolsClassName,
                        )}
                    >
                        <span>Potret</span>
                        <span className="nth-[2]:text-primary">Foto</span>
                        <span>Video</span>
                    </div>
                    <div
                        className={cn(
                            'gk-shutter-row flex items-center justify-between p-[9px_6px_0]',
                            shutterRowClassName,
                        )}
                    >
                        <Image size={18} />
                        <i
                            className={cn(
                                'gk-shutter h-[37px] w-[37px] rounded-[50%] border-[3px] border-[#111] bg-[#eeeee9] outline-[1px] outline-[#ccc] outline-solid',
                                shutterClassName,
                            )}
                        />
                        <Camera size={18} />
                    </div>
                </>
            ) : (
                <>
                    <div className="gk-phone-url mt-[5px] flex h-[22px] items-center gap-1 rounded-[10px] bg-[#242427] pl-[8px] text-[8px] text-[#aaa]">
                        <LockKeyhole size={8} /> galerikita.join
                    </div>
                    <div
                        className={cn(
                            'gk-join mt-[38px] text-center',
                            joinClassName,
                        )}
                    >
                        <Aperture className="m-[0_auto_18px] h-[34px] w-[34px] text-primary" />
                        <strong
                            className={cn(
                                'text-[15px] font-medium',
                                cameraHintClassName,
                            )}
                        >
                            Gabung ke Galeri
                        </strong>
                        <p className="mt-[8px] text-[10px] leading-[1.4] text-[#b1b1b8]">
                            Masukkan nama kamu
                            <br />
                            untuk mulai berbagi foto.
                        </p>
                        <div className="gk-name-input mt-[23px] rounded-[5px] border border-[#505054] bg-[#202023] p-[12px_8px] text-left text-[10px] text-[#b1b1b8]">
                            Nama kamu
                        </div>
                        <div className="gk-join-button mt-[9px] rounded-[5px] bg-primary p-[11px_5px] text-[10px] font-bold text-[#121506]">
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
                'gk-gallery-preview absolute top-[5px] right-[0] h-[383px] w-[198px] rounded-[12px] border border-[#333] bg-[#161618] p-[16px_10px_10px]',
                className,
            )}
            aria-hidden="true"
        >
            <strong className="text-[12px] font-semibold">Galeri Acara</strong>
            <div className="gk-gallery-tabs m-[16px_0] flex gap-5 text-[10px]">
                <span className="first:border-b first:border-b-primary first:pb-[4px] first:text-primary">
                    Semua
                </span>
                <span>Foto</span>
                <span>Video</span>
            </div>
            <div
                className={cn(
                    'gk-preview-grid grid h-[287px] grid-cols-[1fr_1fr] grid-rows-[repeat(3,_1fr)] gap-[5px]',
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
            className="gk-privacy p-[28px_20px_20px] [@media(width<550px)]:pt-[12px] min-[550px]:[@media(width<=768px)]:pt-[12px]"
            aria-hidden="true"
        >
            <div className="gk-privacy-options rounded-[10px] border border-border p-[12px_20px]">
                <div className="flex items-center gap-[18px] p-[8px_0]">
                    <LockKeyhole size={22} />
                    <p>
                        <strong className="block text-[13px] font-semibold">
                            Private
                        </strong>
                        <span className="mt-[4px] block text-[11px] text-muted-foreground">
                            Hanya undangan yang bisa melihat
                        </span>
                    </p>
                </div>
                <div className="flex items-center gap-[18px] p-[8px_0]">
                    <Check
                        className="rounded-[50%] bg-primary fill-primary p-[3px] text-[#101207]"
                        size={22}
                    />
                    <p>
                        <strong className="block text-[13px] font-semibold">
                            Public
                        </strong>
                        <span className="mt-[4px] block text-[11px] text-muted-foreground">
                            Siapa saja dengan link dapat melihat
                        </span>
                    </p>
                </div>
            </div>
            <div className="gk-timing-options mt-[15px] grid grid-cols-[1fr_1fr] gap-[13px]">
                <div className="rounded-[7px] border border-border p-[10px_13px] first:bg-primary first:text-[#171b08]">
                    <strong className="block text-[13px] font-semibold">
                        Instant
                    </strong>
                    <span className="mt-[4px] block text-[11px] text-[#333c11]">
                        Langsung ditampilkan
                    </span>
                </div>
                <div className="rounded-[7px] border border-border p-[10px_13px]">
                    <strong className="block text-[13px] font-semibold">
                        After Event
                    </strong>
                    <span className="mt-[4px] block text-[11px] text-muted-foreground">
                        Ditampilkan setelah acara
                    </span>
                </div>
            </div>
        </div>
    );
}

export function DirectionIcons() {
    return (
        <div className="gk-directions flex gap-3" aria-hidden="true">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[50%] border border-[#49494d] text-foreground first:border-[#29292d] first:text-[#73737b] [@media(width<550px)]:h-[38px] [@media(width<550px)]:w-[38px] min-[550px]:[@media(width<=768px)]:h-[38px] min-[550px]:[@media(width<=768px)]:w-[38px]">
                <ChevronRight
                    className="gk-back-arrow transform-[rotate(180deg)]"
                    size={18}
                />
            </span>
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[50%] border border-[#49494d] text-foreground [@media(width<550px)]:h-[38px] [@media(width<550px)]:w-[38px] min-[550px]:[@media(width<=768px)]:h-[38px] min-[550px]:[@media(width<=768px)]:w-[38px]">
                <ChevronRight size={18} />
            </span>
        </div>
    );
}
