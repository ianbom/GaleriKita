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
import type { CSSProperties, ReactNode } from 'react';
import { dashboard, register } from '@/routes';

export function Brand() {
    return (
        <a href="#beranda" className="gk-brand" aria-label="GaleriKita beranda">
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
            className={`gk-button ${className}`}
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
    style,
    eager = false,
}: {
    src: string;
    name: string;
    className?: string;
    style?: CSSProperties;
    eager?: boolean;
}) {
    return (
        <img
            src={src}
            alt=""
            data-photo={name}
            className={`gk-photo ${className}`}
            style={style}
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
    style,
    eager = false,
}: Parameters<typeof Photo>[0]) {
    return (
        <div className={`gk-print ${className}`} style={style}>
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
            <p className="gk-eyebrow">{label}</p>
            <h2>{children}</h2>
            {description && <p className="gk-description">{description}</p>}
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
        <svg className="gk-qr" viewBox="-2 -2 33 33" aria-hidden="true">
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
            className={`gk-invitation ${compact ? 'gk-invitation-compact' : ''}`}
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
        <div className={`gk-phone ${className}`} aria-hidden="true">
            <div className="gk-phone-top">
                <span>9:41</span>
                <i />
                <Wifi size={11} />
            </div>
            {camera ? (
                <>
                    <Photo
                        src={camera}
                        name={name ?? 'camera'}
                        className="gk-camera-image"
                    />
                    <div className="gk-camera-tools">
                        <span>Potret</span>
                        <span>Foto</span>
                        <span>Video</span>
                    </div>
                    <div className="gk-shutter-row">
                        <Image size={18} />
                        <i className="gk-shutter" />
                        <Camera size={18} />
                    </div>
                </>
            ) : (
                <>
                    <div className="gk-phone-url">
                        <LockKeyhole size={8} /> galerikita.join
                    </div>
                    <div className="gk-join">
                        <Aperture />
                        <strong>Gabung ke Galeri</strong>
                        <p>
                            Masukkan nama kamu
                            <br />
                            untuk mulai berbagi foto.
                        </p>
                        <div className="gk-name-input">Nama kamu</div>
                        <div className="gk-join-button">Gabung Sekarang</div>
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
        <div className="gk-gallery-preview" aria-hidden="true">
            <strong>Galeri Acara</strong>
            <div className="gk-gallery-tabs">
                <span>Semua</span>
                <span>Foto</span>
                <span>Video</span>
            </div>
            <div className="gk-preview-grid">
                {photos.map((photo) => (
                    <Photo key={photo.name} {...photo} />
                ))}
            </div>
        </div>
    );
}

export function PrivacyPreview() {
    return (
        <div className="gk-privacy" aria-hidden="true">
            <div className="gk-privacy-options">
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
            <div className="gk-timing-options">
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
        <div className="gk-directions" aria-hidden="true">
            <span>
                <ChevronRight className="gk-back-arrow" size={18} />
            </span>
            <span>
                <ChevronRight size={18} />
            </span>
        </div>
    );
}
