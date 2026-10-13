import {
    CalendarDays,
    ChevronRight,
    Clock3,
    Info,
    Play,
    ScanQrCode,
    Aperture,
    Images,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { galerikitaAssets as assets } from '@/lib/galerikita-assets';
import {
    DirectionIcons,
    EventLink,
    GalleryPreview,
    Invitation,
    Phone,
    Photo,
    Print,
    PrivacyPreview,
    QrIllustration,
    SectionHeading,
} from './primitives';

export function HeroSection() {
    return (
        <section id="beranda" className="gk-hero gk-section">
            <div className="gk-container gk-hero-layout">
                <div className="gk-hero-copy">
                    <p className="gk-eyebrow">
                        EVERY MOMENT. EVERY PERSPECTIVE.
                    </p>
                    <h1>
                        Satu acara.
                        <br />
                        <em>
                            Sejuta <span>cerita.</span>
                        </em>
                    </h1>
                    <p className="gk-description">
                        Abadikan setiap sudut pandang. Kumpulkan foto dari semua
                        orang dalam satu galeri, cukup dengan satu QR code.
                    </p>
                    <div className="gk-hero-actions">
                        <EventLink />
                        <a
                            href="#cara-kerja"
                            className="gk-button gk-button-outline"
                        >
                            <Play size={19} aria-hidden="true" />
                            Lihat Cara Kerja
                        </a>
                    </div>
                    <p className="gk-note">
                        <Info size={14} aria-hidden="true" />
                        Tanpa perlu akun untuk peserta.
                    </p>
                </div>
                <div
                    className="gk-hero-collage"
                    aria-label="Ilustrasi galeri foto kolaboratif"
                >
                    <Print
                        name="hero.graduation"
                        src={assets.hero.graduation}
                        className="gk-hero-graduation"
                        eager
                    />
                    <Print
                        name="hero.birthday"
                        src={assets.hero.birthday}
                        className="gk-hero-birthday"
                        eager
                    />
                    <Print
                        name="hero.extra"
                        src={assets.hero.extra}
                        className="gk-hero-extra"
                        eager
                    />
                    <Print
                        name="hero.friends"
                        src={assets.hero.friends}
                        className="gk-hero-friends"
                        eager
                    />
                    <Print
                        name="hero.wedding"
                        src={assets.hero.wedding}
                        className="gk-hero-wedding"
                        eager
                    />
                    <Print
                        name="hero.vacation"
                        src={assets.hero.vacation}
                        className="gk-hero-vacation"
                        eager
                    />
                    <Print
                        name="hero.background"
                        src={assets.hero.background}
                        className="gk-hero-background"
                        eager
                    />
                    <div className="gk-album-summary">
                        <div className="gk-album-avatars">
                            {(
                                ['avatar01', 'avatar02', 'avatar03'] as const
                            ).map((key) => (
                                <Photo
                                    key={key}
                                    src={assets.hero[key]}
                                    name={`hero.${key}`}
                                    eager
                                />
                            ))}
                        </div>
                        <p>
                            <strong>Galeri Reuni 2026</strong>
                            <span>
                                <b>129</b> Foto Terkumpul
                            </span>
                        </p>
                        <ChevronRight size={20} />
                    </div>
                    <div className="gk-hero-qr" aria-hidden="true">
                        <div className="gk-scan-corners">
                            <p>
                                Scan untuk
                                <br />
                                bergabung
                            </p>
                            <QrIllustration />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Step({
    number,
    title,
    description,
    children,
}: {
    number: string;
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <article className="gk-step">
            <div className="gk-step-heading">
                <span className="gk-step-number">{number}</span>
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div className="gk-step-art" aria-hidden="true">
                {children}
            </div>
        </article>
    );
}

export function HowItWorksSection() {
    return (
        <section id="cara-kerja" className="gk-how gk-section">
            <div className="gk-container">
                <div className="gk-heading-row">
                    <SectionHeading
                        label="CARA KERJA"
                        description="Semudah membuat acara, membagikan QR, dan mengabadikan cerita bersama."
                    >
                        Semua momen,
                        <br />
                        dalam <em>tiga langkah.</em>
                    </SectionHeading>
                    <p className="gk-handwritten">
                        Foto lebih seru
                        <br />
                        kalau dilakukan
                        <br />
                        bersama.
                    </p>
                </div>
                <div className="gk-steps">
                    <Step
                        number="01"
                        title="Buat Event"
                        description="Buat acara dan atur galeri sesuai kebutuhanmu."
                    >
                        <div className="gk-event-preview">
                            <Photo
                                src={assets.how.eventCover}
                                name="how.eventCover"
                            />
                            <div className="gk-event-title">
                                Pernikahan Andi &amp; Sari
                            </div>
                            <div className="gk-event-schedule">
                                <span>
                                    <CalendarDays size={14} /> Sab, 14 Jun 2025
                                </span>
                                <span>
                                    <Clock3 size={14} /> 10:00 - selesai
                                </span>
                            </div>
                            <div className="gk-event-access">
                                <span>
                                    <i />
                                    Public
                                </span>
                                <span>
                                    <i />
                                    Private
                                </span>
                            </div>
                            <div className="gk-event-capacity">
                                <p>
                                    Maks. fotografer<strong>500 orang</strong>
                                </p>
                                <Photo
                                    src={assets.how.eventDetail}
                                    name="how.eventDetail"
                                />
                            </div>
                        </div>
                    </Step>
                    <Step
                        number="02"
                        title="Bagikan QR Code"
                        description="Bagikan QR. Peserta cukup scan dan masukkan nama."
                    >
                        <Invitation />
                        <Phone className="gk-how-join-phone" />
                    </Step>
                    <Step
                        number="03"
                        title="Abadikan Momen"
                        description="Semua peserta bisa mengambil atau mengunggah foto ke satu album."
                    >
                        <Phone camera={assets.how.camera} name="how.camera" />
                        <GalleryPreview
                            photos={Array.from({ length: 6 }, (_, index) => {
                                const key =
                                    `gallery0${index + 1}` as keyof typeof assets.how;
                                return {
                                    src: assets.how[key],
                                    name: `how.${key}`,
                                };
                            })}
                        />
                    </Step>
                </div>
            </div>
        </section>
    );
}

function Feature({
    title,
    description,
    icon,
    className = '',
    children,
}: {
    title: string;
    description: string;
    icon: ReactNode;
    className?: string;
    children: ReactNode;
}) {
    return (
        <article className={`gk-feature ${className}`}>
            <div className="gk-feature-heading">
                <span className="gk-feature-icon" aria-hidden="true">
                    {icon}
                </span>
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div className="gk-feature-art" aria-hidden="true">
                {children}
            </div>
        </article>
    );
}

function DriveMark() {
    return (
        <svg viewBox="0 0 48 44" className="gk-drive-mark" aria-hidden="true">
            <path fill="#37a85b" d="M16 2h16L16 30H0z" />
            <path fill="#ffcb3b" d="M32 2 48 30H32L16 2z" />
            <path fill="#4285ee" d="M0 30h48l-8 14H8z" />
        </svg>
    );
}

export function FeaturesSection() {
    return (
        <section id="fitur" className="gk-features gk-section">
            <div className="gk-container gk-container-wide">
                <div className="gk-heading-row gk-inset-heading">
                    <SectionHeading label="BUILT FOR EVERY MOMENT">
                        Lebih dari
                        <br />
                        sekadar galeri <em>foto.</em>
                    </SectionHeading>
                    <div className="gk-heading-aside">
                        <p>
                            Fitur lengkap untuk pengalaman mengabadikan
                            <br />
                            momen yang lebih berkesan, bersama-sama.
                        </p>
                        <DirectionIcons />
                    </div>
                </div>
                <div className="gk-bento">
                    <Feature
                        title="Scan QR, Langsung Gabung"
                        description=""
                        icon={<ScanQrCode />}
                        className="gk-feature-qr"
                    >
                        <Invitation compact />
                        <Phone />
                    </Feature>
                    <Feature
                        title="Kamera dengan Filter & Bingkai"
                        description="Ambil foto dengan gayamu sendiri."
                        icon={<Aperture />}
                        className="gk-feature-camera"
                    >
                        <Phone
                            camera={assets.features.camera}
                            name="features.camera"
                        />
                        <div className="gk-filters">
                            {(
                                [
                                    'original',
                                    'film',
                                    'vivid',
                                    'monochrome',
                                ] as const
                            ).map((key, index) => (
                                <div key={key}>
                                    <Photo
                                        src={assets.features[key]}
                                        name={`features.${key}`}
                                    />
                                    <span>
                                        {
                                            [
                                                'Original',
                                                'Film',
                                                'Vivid',
                                                'B&W',
                                            ][index]
                                        }
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Print
                            src={assets.features.print01}
                            name="features.print01"
                            className="gk-feature-print-one"
                        />
                        <Print
                            src={assets.features.print02}
                            name="features.print02"
                            className="gk-feature-print-two"
                        />
                    </Feature>
                    <Feature
                        title="Galeri Sesuai Keinginan"
                        description="Atur siapa yang bisa melihat dan kapan foto ditampilkan."
                        icon={<Images />}
                        className="gk-feature-privacy"
                    >
                        <PrivacyPreview />
                    </Feature>
                    <Feature
                        title="24 Jam Penuh Cerita"
                        description="Periode khusus untuk mengumpulkan foto selama acara."
                        icon={<Clock3 />}
                        className="gk-feature-timer"
                    >
                        <div className="gk-timer-display">
                            <span>24 JAM</span>
                            <div className="gk-clock">
                                <i />
                                <b />
                            </div>
                        </div>
                        <div className="gk-timer-collage">
                            {Array.from({ length: 6 }, (_, index) => {
                                const key =
                                    `timer0${index + 1}` as keyof typeof assets.features;
                                return (
                                    <Print
                                        key={key}
                                        src={assets.features[key]}
                                        name={`features.${key}`}
                                    />
                                );
                            })}
                        </div>
                    </Feature>
                    <Feature
                        title="Simpan ke Google Drive"
                        description="Sinkronkan foto setelah acara selesai."
                        icon={<DriveMark />}
                        className="gk-feature-drive"
                    >
                        <div className="gk-drive-line" />
                        <div className="gk-drive-circle">
                            <DriveMark />
                        </div>
                        <div className="gk-drive-collage">
                            {Array.from({ length: 10 }, (_, index) => {
                                const key =
                                    `drive${String(index + 1).padStart(2, '0')}` as keyof typeof assets.features;
                                return (
                                    <Print
                                        key={key}
                                        src={assets.features[key]}
                                        name={`features.${key}`}
                                    />
                                );
                            })}
                        </div>
                    </Feature>
                </div>
            </div>
        </section>
    );
}
