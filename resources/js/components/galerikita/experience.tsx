import { cn } from '@/lib/utils';
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
        <section
            id="beranda"
            className="gk-hero gk-section relative min-h-[580px] scroll-mt-[24px] [border-bottom:1px_solid_#ffffff0b] gk-small:min-h-[530px] gk-mobile:min-h-[0] [&_.gk-description]:mt-[20px] [&_.gk-description]:max-w-[520px] gk-compact:[&_.gk-description]:max-w-[440px] gk-compact:[&_.gk-description]:text-[16px] gk-mobile:[&_.gk-description]:mt-[23px] gk-mobile:[&_.gk-description]:max-w-[490px] [&_h1]:text-[100px] [&_h1]:leading-[0.98] [&_h1]:font-bold [&_h1]:tracking-[-6px] [&_h1]:whitespace-nowrap gk-compact:[&_h1]:text-[84px] gk-small:[&_h1]:text-[70px] gk-small:[&_h1]:tracking-[-4px] gk-mobile:[&_h1]:text-[clamp(59px,_10vw,_83px)] gk-mobile:[&_h1]:tracking-[-3.8px] [&_h1_em]:text-[126px] [&_h1_em]:leading-[0.97] [&_h1_em]:tracking-[-4px] gk-compact:[&_h1_em]:text-[100px] gk-small:[&_h1_em]:text-[84px] gk-mobile:[&_h1_em]:text-[clamp(70px,_12vw,_100px)] gk-mobile:[&_h1_em]:tracking-[-2.8px] [&_h1_em_span]:text-gk-accent"
        >
            <div className="gk-container gk-hero-layout relative mx-[auto] min-h-[580px] w-[min(100%_-_128px,_1312px)] gk-compact:w-[calc(100%_-_80px)] gk-small:min-h-[530px] gk-mobile:min-h-[0] gk-mobile:w-[calc(100%_-_40px)]">
                <div className="gk-hero-copy relative z-[3] w-[550px] pt-[80px] gk-compact:w-[47%] gk-mobile:w-[100%] gk-mobile:pt-[50px]">
                    <p className="gk-eyebrow mb-[14px]! text-[12px] font-bold tracking-[2px] text-gk-secondary gk-mobile:text-[10px] gk-mobile:tracking-[1.6px]">
                        EVERY MOMENT. EVERY PERSPECTIVE.
                    </p>
                    <h1>
                        Satu acara.
                        <br />
                        <em className="font-gk-display font-normal">
                            Sejuta <span>cerita.</span>
                        </em>
                    </h1>
                    <p className="gk-description text-[18px] leading-[1.45] text-gk-secondary gk-mobile:text-[15px]">
                        Abadikan setiap sudut pandang. Kumpulkan foto dari semua
                        orang dalam satu galeri, cukup dengan satu QR code.
                    </p>
                    <div className="gk-hero-actions mt-[25px] flex items-center gap-4 gk-compact:gap-[12px] gk-mobile:mt-[22px] gk-mobile:gap-[10px] gk-compact:[&_.gk-button]:px-[19px] gk-compact:[&_.gk-button]:text-[13px] gk-mobile:[&_.gk-button]:min-h-[46px] gk-mobile:[&_.gk-button]:p-[12px_15px] gk-mobile:[&_.gk-button]:text-[12px]">
                        <EventLink />
                        <a
                            href="#cara-kerja"
                            className="gk-button gk-button-outline inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[999px] p-[14px_28px] text-[15px] font-bold whitespace-nowrap text-gk-text [background:transparent] [border:1px_solid_#515154] [transition:background_0.15s,_border-color_0.15s] [&_>_svg]:h-[23px] [&_>_svg]:w-[23px] [&_>_svg]:rounded-[50%] [&_>_svg]:p-[3px] [&_>_svg]:[border:1px_solid_#b1b1b8] [&:hover]:border-gk-text [&:hover]:[background:#ffffff08]"
                        >
                            <Play size={19} aria-hidden="true" />
                            Lihat Cara Kerja
                        </a>
                    </div>
                    <p className="gk-note mt-[14px]! flex items-center gap-2 text-[13px] text-gk-secondary gk-mobile:mt-[13px]! gk-mobile:text-[11px]">
                        <Info size={14} aria-hidden="true" />
                        Tanpa perlu akun untuk peserta.
                    </p>
                </div>
                <div
                    className="gk-hero-collage absolute top-[-10px] left-[526px] h-[660px] w-[830px] gk-compact:left-[43%] gk-compact:[transform-origin:top_left] gk-compact:[transform:scale(0.87)] gk-small:top-[40px] gk-small:left-[44%] gk-small:[transform:scale(0.7)] gk-mobile:relative gk-mobile:top-[auto] gk-mobile:left-[auto] gk-mobile:mt-[28px] gk-mobile:aspect-[830/670] gk-mobile:h-[auto] gk-mobile:w-[100%] gk-mobile-wide:mx-[auto] gk-mobile-wide:max-w-[600px] [&_>_.gk-print]:absolute [&_>_.gk-print]:p-[4px] gk-mobile:[&.gk-hero-collage_.gk-print]:p-[2px_2px_12px]"
                    aria-label="Ilustrasi galeri foto kolaboratif"
                >
                    <Print
                        name="hero.graduation"
                        src={assets.hero.graduation}
                        className="gk-hero-graduation top-[32px] left-[15px] z-[2] h-[330px] w-[402px] [transform:rotate(-7deg)] gk-mobile:top-[4.8%] gk-mobile:left-[1.8%] gk-mobile:h-[49.2%] gk-mobile:w-[48.4%]"
                        eager
                    />
                    <Print
                        name="hero.birthday"
                        src={assets.hero.birthday}
                        className="gk-hero-birthday top-[70px] left-[390px] z-[3] h-[302px] w-[380px] [transform:rotate(10deg)] gk-mobile:top-[12.1%] gk-mobile:left-[47%] gk-mobile:h-[45.1%] gk-mobile:w-[45.8%]"
                        eager
                    />
                    <Print
                        name="hero.extra"
                        src={assets.hero.extra}
                        className="gk-hero-extra top-[204px] left-[698px] z-[1] h-[190px] w-[150px] [transform:rotate(10deg)] gk-mobile:top-[30.4%] gk-mobile:left-[84.1%] gk-mobile:h-[28.4%] gk-mobile:w-[18%]"
                        eager
                    />
                    <Print
                        name="hero.friends"
                        src={assets.hero.friends}
                        className="gk-hero-friends top-[337px] left-[430px] z-[4] h-[285px] w-[285px] [transform:rotate(-5deg)] gk-mobile:top-[50.3%] gk-mobile:left-[51.8%] gk-mobile:h-[42.5%] gk-mobile:w-[34.3%]"
                        eager
                    />
                    <Print
                        name="hero.wedding"
                        src={assets.hero.wedding}
                        className="gk-hero-wedding top-[300px] left-[165px] z-[5] h-[260px] w-[330px] [transform:rotate(-8deg)] pb-[24px]! gk-mobile:top-[44.8%] gk-mobile:left-[21.1%] gk-mobile:h-[38.8%] gk-mobile:w-[39.8%]"
                        eager
                    />
                    <Print
                        name="hero.vacation"
                        src={assets.hero.vacation}
                        className="gk-hero-vacation top-[397px] left-[-4px] z-[6] h-[235px] w-[307px] [transform:rotate(11deg)] gk-mobile:top-[61.3%] gk-mobile:left-[-0.5%] gk-mobile:h-[35.1%] gk-mobile:w-[37%]"
                        eager
                    />
                    <Print
                        name="hero.background"
                        src={assets.hero.background}
                        className="gk-hero-background top-[520px] left-[290px] z-[0] h-[460px] w-[445px] [transform:rotate(-19deg)] [opacity:0.045] gk-mobile:hidden"
                        eager
                    />
                    <div className="gk-album-summary absolute top-[46px] left-[525px] z-[7] flex w-[258px] items-center gap-4 rounded-[10px] p-[14px] [box-shadow:0_8px_28px_#0005] [background:#19191b] [border:1px_solid_#434347] gk-mobile:top-[6.9%] gk-mobile:left-[63%] gk-mobile:w-[34%] gk-mobile:gap-[5px] gk-mobile:rounded-[6px] gk-mobile:p-[7px] [&_>_svg]:text-gk-accent gk-mobile:[&_>_svg]:w-[10px] [&_b]:text-gk-accent [&_p]:[flex:1] [&_p]:text-[12px] gk-mobile:[&_p]:text-[7px] [&_p_span]:mt-[6px] [&_p_span]:block [&_p_span]:text-[11px] [&_p_span]:text-gk-secondary gk-mobile:[&_p_span]:mt-[3px] gk-mobile:[&_p_span]:text-[6px] [&_strong]:block [&_strong]:font-semibold">
                        <div className="gk-album-avatars relative h-[45px] w-[42px] [flex:0_0_42px] gk-mobile:h-[25px] gk-mobile:w-[23px] gk-mobile:basis-[23px] [&_img]:absolute [&_img]:h-[27px] [&_img]:w-[27px] [&_img]:rounded-[50%] [&_img]:[border:1px_solid_#777] gk-mobile:[&_img]:h-[15px] gk-mobile:[&_img]:w-[15px] [&_img:nth-child(2)]:left-[17px] gk-mobile:[&_img:nth-child(2)]:left-[9px] [&_img:nth-child(3)]:top-[19px] [&_img:nth-child(3)]:left-[9px] gk-mobile:[&_img:nth-child(3)]:top-[10px] gk-mobile:[&_img:nth-child(3)]:left-[5px]">
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
                    <div
                        className="gk-hero-qr absolute top-[267px] left-[615px] z-[8] h-[272px] w-[166px] [transform:rotate(5deg)] rounded-[11px] p-[15px] [box-shadow:0_10px_25px_#0009] [background:#111113] [border:1px_solid_#555] gk-mobile:top-[41.3%] gk-mobile:left-[80.1%] gk-mobile:h-[40.6%] gk-mobile:w-[20%] gk-mobile:rounded-[6px] gk-mobile:p-[7px]"
                        aria-hidden="true"
                    >
                        <div className="gk-scan-corners h-[100%] bg-no-repeat! p-[17px_3px] [background:linear-gradient(var(--color-gk-accent),_var(--color-gk-accent))_left_top_/_14px_3px,_linear-gradient(var(--color-gk-accent),_var(--color-gk-accent))_left_top_/_3px_14px,_linear-gradient(var(--color-gk-accent),_var(--color-gk-accent))_right_top_/_14px_3px,_linear-gradient(var(--color-gk-accent),_var(--color-gk-accent))_right_top_/_3px_14px,_linear-gradient(var(--color-gk-accent),_var(--color-gk-accent))_left_bottom_/_14px_3px,_linear-gradient(var(--color-gk-accent),_var(--color-gk-accent))_left_bottom_/_3px_14px,_linear-gradient(var(--color-gk-accent),_var(--color-gk-accent))_right_bottom_/_14px_3px,_linear-gradient(var(--color-gk-accent),_var(--color-gk-accent))_right_bottom_/_3px_14px] gk-mobile:p-[10%_4%] [&_p]:mb-[21px] [&_p]:text-center [&_p]:text-[16px] [&_p]:leading-[1.2] gk-mobile:[&_p]:mb-[16%] gk-mobile:[&_p]:text-[clamp(7px,_1.65vw,_12px)]">
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
        <article className="gk-step gk-mobile:mx-[auto] gk-mobile:w-[min(100%,_420px)] gk-mobile:[&:last-child_.gk-camera-image]:h-[250px] gk-mobile:[&:last-child_.gk-gallery-preview]:h-[356px] gk-mobile:[&:last-child_.gk-gallery-preview]:w-[48%] [&:last-child_.gk-phone]:absolute [&:last-child_.gk-phone]:top-[0] [&:last-child_.gk-phone]:left-[0] gk-mobile:[&:last-child_.gk-phone]:h-[362px] gk-mobile:[&:last-child_.gk-phone]:w-[49%] gk-mobile:[&:last-child_.gk-preview-grid]:h-[259px] gk-mobile:[&:nth-child(2)_.gk-invitation]:h-[335px] gk-mobile:[&:nth-child(2)_.gk-invitation]:w-[60%] gk-mobile:[&:nth-child(2)_.gk-invitation]:px-[12px] gk-mobile:[&:nth-child(2)_.gk-invitation_.gk-qr]:w-[135px]">
            <div className="gk-step-heading flex min-h-[136px] gap-[27px] gk-compact:gap-[21px] gk-mobile:min-h-[124px] gk-mobile:gap-[24px] [&_>_div]:mt-[22px] [&_>_div]:[flex:1] [&_>_div]:pt-[22px] [&_>_div]:[border-top:1px_solid_#666] gk-mobile:[&_>_div]:mt-[14px] gk-mobile:[&_>_div]:pt-[14px] [&_h3]:text-[23px] [&_h3]:font-semibold [&_h3]:tracking-[-0.8px] gk-compact:[&_h3]:text-[20px] gk-mobile:[&_h3]:text-[21px] [&_p]:mt-[8px] [&_p]:max-w-[250px] [&_p]:text-[15px] [&_p]:leading-[1.35] [&_p]:text-gk-secondary gk-mobile:[&_p]:text-[13px]">
                <span className="gk-step-number font-gk-display text-[109px] leading-[0.85] tracking-[-6px] italic gk-compact:text-[94px] gk-mobile:text-[92px]">
                    {number}
                </span>
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div
                className="gk-step-art relative h-[410px] overflow-hidden gk-compact:[zoom:0.85] gk-small:[zoom:0.72] gk-mobile:h-[375px]"
                aria-hidden="true"
            >
                {children}
            </div>
        </article>
    );
}

export function HowItWorksSection() {
    return (
        <section
            id="cara-kerja"
            className="gk-how gk-section relative min-h-[820px] scroll-mt-[24px] pt-[46px] [border-bottom:1px_solid_#ffffff0b] gk-compact:min-h-[760px] gk-small:min-h-[710px] gk-mobile:min-h-[0] gk-mobile:p-[46px_0_0] [&_.gk-handwritten]:pr-[5px] [&_.gk-handwritten]:pb-[20px] gk-mobile:[&_.gk-handwritten]:hidden [&_.gk-handwritten::after]:mt-[17px] [&_.gk-handwritten::after]:block [&_.gk-handwritten::after]:h-[1px] [&_.gk-handwritten::after]:w-[80px] [&_.gk-handwritten::after]:[transform:rotate(-9deg)] [&_.gk-handwritten::after]:[content:''] [&_.gk-handwritten::after]:[background:#666] [&_.gk-heading-row]:relative [&_.gk-heading-row]:z-[1]"
        >
            <div className="gk-container relative mx-[auto] w-[min(100%_-_128px,_1312px)] gk-compact:w-[calc(100%_-_80px)] gk-mobile:w-[calc(100%_-_40px)]">
                <div className="gk-heading-row flex items-end justify-between gap-[24px] gk-mobile:flex-col gk-mobile:[align-items:start] gk-mobile:gap-[20px]">
                    <SectionHeading
                        label="CARA KERJA"
                        description="Semudah membuat acara, membagikan QR, dan mengabadikan cerita bersama."
                    >
                        Semua momen,
                        <br />
                        {'dalam '}
                        <em className="font-gk-display font-normal">
                            tiga langkah.
                        </em>
                    </SectionHeading>
                    <p className="gk-handwritten [transform:rotate(-8deg)] font-gk-display text-[27px] leading-[1.25] tracking-[1px] text-[#949498] italic">
                        Foto lebih seru
                        <br />
                        kalau dilakukan
                        <br />
                        bersama.
                    </p>
                </div>
                <div className="gk-steps mt-[36px] grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-[43px] gk-compact:gap-[26px] gk-mobile:mt-[34px] gk-mobile:grid-cols-[1fr] gk-mobile:gap-[34px]">
                    <Step
                        number="01"
                        title="Buat Event"
                        description="Buat acara dan atur galeri sesuai kebutuhanmu."
                    >
                        <div className="gk-event-preview relative h-[415px] w-[380px] max-w-[100%] rounded-[10px] p-[18px] [background:linear-gradient(140deg,_#151517,_#0e0e10)] [border:1px_solid_var(--color-gk-border)] gk-mobile:h-[385px] gk-mobile:w-[100%] [&_>_.gk-photo]:h-[108px] [&_>_.gk-photo]:rounded-[5px]">
                            <Photo
                                src={assets.how.eventCover}
                                name="how.eventCover"
                            />
                            <div className="gk-event-title mt-[13px] rounded-[5px] p-[10px] text-[15px] [border:1px_solid_var(--color-gk-border)]">
                                Pernikahan Andi &amp; Sari
                            </div>
                            <div className="gk-event-schedule mt-[10px] flex gap-2 [&_span]:flex [&_span]:items-center [&_span]:gap-2 [&_span]:rounded-[5px] [&_span]:p-[7px] [&_span]:text-[11px] [&_span]:whitespace-nowrap [&_span]:[border:1px_solid_var(--color-gk-border)]">
                                <span>
                                    <CalendarDays size={14} /> Sab, 14 Jun 2025
                                </span>
                                <span>
                                    <Clock3 size={14} /> 10:00 - selesai
                                </span>
                            </div>
                            <div className="gk-event-access m-[18px_9px] flex gap-[30px] text-[13px] [&_i]:h-[17px] [&_i]:w-[17px] [&_i]:rounded-[50%] [&_i]:[border:5px_solid_#69696d] [&_span]:flex [&_span]:items-center [&_span]:gap-2 [&_span:first-child]:text-gk-accent [&_span:first-child_i]:border-gk-accent">
                                <span>
                                    <i />
                                    Public
                                </span>
                                <span>
                                    <i />
                                    Private
                                </span>
                            </div>
                            <div className="gk-event-capacity relative h-[120px] overflow-hidden rounded-[5px] [border:1px_solid_var(--color-gk-border)] [&_img]:absolute [&_img]:top-[31px] [&_img]:right-[-17px] [&_img]:h-[100px] [&_img]:w-[155px] [&_img]:[transform:rotate(-15deg)] [&_img]:[opacity:0.6] [&_p]:p-[9px] [&_p]:text-[13px] [&_p]:text-gk-secondary [&_strong]:mt-[6px] [&_strong]:block [&_strong]:text-gk-text">
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
                        <Phone className="gk-how-join-phone absolute top-[20px] right-[1px] h-[426px] w-[209px] [transform:rotate(4deg)] gk-mobile:h-[397px] gk-mobile:w-[52%]" />
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
        <article
            className={cn(
                `gk-feature relative [grid-column:span_2] h-[371px] overflow-hidden rounded-[12px] [background:radial-gradient(ellipse_at_top_left,_#21212366,_transparent_65%),_#111113] [border:1px_solid_var(--color-gk-border)] gk-small:h-[323px] gk-mobile:[grid-column:span_2] gk-mobile:h-[352px] ${className}`,
            )}
        >
            <div className="gk-feature-heading relative z-[2] flex gap-[16px] p-[21px_22px_0] gk-compact:gap-[12px] gk-compact:px-[16px] gk-small:gap-[10px] gk-mobile:gap-[14px] gk-mobile:p-[19px_18px_0] [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:tracking-[-0.6px] gk-compact:[&_h3]:text-[17px] gk-small:[&_h3]:text-[15px] gk-mobile:[&_h3]:text-[18px] [&_p]:mt-[6px] [&_p]:text-[14px] [&_p]:leading-[1.4] [&_p]:text-gk-secondary gk-compact:[&_p]:text-[12px] gk-mobile:[&_p]:text-[13px]">
                <span
                    className="gk-feature-icon flex h-[48px] w-[48px] shrink-[0] items-center justify-center rounded-[12px] text-[#c2dc61] [background:#242425] [border:1px_solid_#38383c] gk-small:h-[38px] gk-small:w-[38px] gk-mobile:h-[43px] gk-mobile:w-[43px] [&_svg]:h-[25px] [&_svg]:w-[25px]"
                    aria-hidden="true"
                >
                    {icon}
                </span>
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div
                className="gk-feature-art absolute top-[96px] right-[0] bottom-[0] left-[0] gk-compact:[zoom:0.85] gk-small:[zoom:0.7] gk-mobile:mx-[auto] gk-mobile:max-w-[440px]"
                aria-hidden="true"
            >
                {children}
            </div>
        </article>
    );
}

function DriveMark() {
    return (
        <svg
            viewBox="0 0 48 44"
            className="gk-drive-mark h-[44px] w-[49px] gk-mobile:h-[34px] gk-mobile:w-[37px]"
            aria-hidden="true"
        >
            <path fill="#37a85b" d="M16 2h16L16 30H0z" />
            <path fill="#ffcb3b" d="M32 2 48 30H32L16 2z" />
            <path fill="#4285ee" d="M0 30h48l-8 14H8z" />
        </svg>
    );
}

export function FeaturesSection() {
    return (
        <section
            id="fitur"
            className="gk-features gk-section relative min-h-[858px] scroll-mt-[24px] p-[31px_0_14px] [border-bottom:1px_solid_#ffffff0b] gk-small:min-h-[780px] gk-mobile:min-h-[0] gk-mobile:p-[38px_0_24px] [&_.gk-heading-row]:mb-[14px]"
        >
            <div className="gk-container gk-container-wide relative mx-[auto] w-[min(100%_-_88px,_1352px)] gk-compact:w-[calc(100%_-_48px)] gk-mobile:w-[calc(100%_-_40px)]">
                <div className="gk-heading-row gk-inset-heading flex items-end justify-between gap-[24px] px-[20px] gk-mobile:flex-col gk-mobile:[align-items:start] gk-mobile:gap-[20px] gk-mobile:px-[0]">
                    <SectionHeading label="BUILT FOR EVERY MOMENT">
                        Lebih dari
                        <br />
                        {'sekadar galeri '}
                        <em className="font-gk-display font-normal">foto.</em>
                    </SectionHeading>
                    <div className="gk-heading-aside flex items-center gap-[56px] pb-[12px] text-[16px] text-gk-secondary gk-compact:gap-[28px] gk-compact:text-[14px] gk-mobile:w-[100%] gk-mobile:justify-between gk-mobile:gap-[15px] gk-mobile:p-[0] gk-mobile:text-[13px] gk-mobile:[&_br]:hidden">
                        <p>
                            Fitur lengkap untuk pengalaman mengabadikan
                            <br />
                            momen yang lebih berkesan, bersama-sama.
                        </p>
                        <DirectionIcons />
                    </div>
                </div>
                <div className="gk-bento grid grid-cols-[repeat(24,_minmax(0,_1fr))] gap-[12px] gk-mobile:grid-cols-[repeat(2,_minmax(0,_1fr))] gk-mobile:gap-[12px]">
                    <Feature
                        title="Scan QR, Langsung Gabung"
                        description=""
                        icon={<ScanQrCode />}
                        className="gk-feature-qr [grid-column:span_8] [&_.gk-join]:mt-[30px] [&_.gk-join_strong]:text-[12px] [&_.gk-phone]:absolute [&_.gk-phone]:top-[-26px] [&_.gk-phone]:right-[34px] [&_.gk-phone]:h-[360px] [&_.gk-phone]:w-[171px] [&_.gk-phone]:[transform:rotate(4deg)] gk-compact:[&_.gk-phone]:right-[10px] gk-mobile:[&_.gk-phone]:right-[25px] [&_h3]:max-w-[180px]"
                    >
                        <Invitation compact />
                        <Phone />
                    </Feature>
                    <Feature
                        title="Kamera dengan Filter & Bingkai"
                        description="Ambil foto dengan gayamu sendiri."
                        icon={<Aperture />}
                        className="gk-feature-camera [grid-column:span_9] [&_.gk-camera-image]:h-[198px] [&_.gk-camera-tools]:gap-[10px] [&_.gk-camera-tools]:text-[5px] [&_.gk-phone]:absolute [&_.gk-phone]:top-[2px] [&_.gk-phone]:left-[21px] [&_.gk-phone]:h-[288px] [&_.gk-phone]:w-[149px] [&_.gk-phone]:rounded-[21px] [&_.gk-phone]:p-[6px] gk-mobile:[&_.gk-phone]:left-[17px] gk-mobile:[&_.gk-phone]:h-[280px] gk-mobile:[&_.gk-phone]:w-[127px] [&_.gk-phone-top]:h-[12px] [&_.gk-phone-top]:p-[0_4px] [&_.gk-phone-top]:text-[6px] [&_.gk-phone-top_i]:h-[7px] [&_.gk-phone-top_i]:w-[40px] [&_.gk-print]:absolute [&_.gk-print]:top-[135px] [&_.gk-print]:h-[160px] [&_.gk-print]:w-[125px] [&_.gk-print]:p-[5px_5px_23px] gk-mobile:[&_.gk-print]:h-[141px] gk-mobile:[&_.gk-print]:w-[100px] [&_.gk-shutter]:h-[26px] [&_.gk-shutter]:w-[26px] [&_.gk-shutter-row]:pt-[6px]"
                    >
                        <Phone
                            camera={assets.features.camera}
                            name="features.camera"
                        />
                        <div className="gk-filters absolute top-[10px] right-[23px] left-[194px] grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-[8px] gk-compact:right-[12px] gk-compact:left-[177px] gk-compact:gap-[4px] gk-mobile:right-[14px] gk-mobile:left-[159px] gk-mobile:gap-[5px] [&_.gk-photo]:h-[55px] [&_.gk-photo]:rounded-[11px] [&_.gk-photo]:[border:1px_solid_#727276] gk-mobile:[&_.gk-photo]:h-[49px] [&_>_div:nth-child(2)_img]:[filter:sepia(0.25)] [&_>_div:nth-child(3)_img]:[filter:contrast(1.3)] [&_>_div:nth-child(4)_img]:[filter:grayscale(1)] [&_span]:mt-[7px] [&_span]:block [&_span]:text-center [&_span]:text-[9px]">
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
                            className="gk-feature-print-one left-[190px] [transform:rotate(-12deg)] gk-compact:left-[170px] gk-mobile:left-[158px]"
                        />
                        <Print
                            src={assets.features.print02}
                            name="features.print02"
                            className="gk-feature-print-two left-[292px] [transform:rotate(12deg)] gk-compact:left-[253px] gk-mobile:left-[239px]"
                        />
                    </Feature>
                    <Feature
                        title="Galeri Sesuai Keinginan"
                        description="Atur siapa yang bisa melihat dan kapan foto ditampilkan."
                        icon={<Images />}
                        className="gk-feature-privacy [grid-column:span_7] gk-mobile:h-[323px]"
                    >
                        <PrivacyPreview />
                    </Feature>
                    <Feature
                        title="24 Jam Penuh Cerita"
                        description="Periode khusus untuk mengumpulkan foto selama acara."
                        icon={<Clock3 />}
                        className="gk-feature-timer [grid-column:span_14] h-[270px] gk-small:h-[245px] gk-mobile:h-[350px] [&_.gk-feature-art]:top-[92px] [&_.gk-feature-heading_p]:max-w-[300px] gk-small:[&_.gk-feature-heading_p]:max-w-[210px]"
                    >
                        <div className="gk-timer-display absolute bottom-[23px] left-[46px] flex items-center gap-[33px] gk-compact:left-[30px] gk-compact:gap-[22px] gk-mobile:bottom-[25px] gk-mobile:left-[22px] gk-mobile:gap-[20px] [&_>_span]:font-gk-display [&_>_span]:text-[76px] [&_>_span]:leading-[1] [&_>_span]:tracking-[-3px] [&_>_span]:whitespace-nowrap gk-mobile:[&_>_span]:text-[63px]">
                            <span>24 JAM</span>
                            <div className="gk-clock relative h-[145px] w-[145px] [transform:rotate(-6deg)] rounded-[50%] [background:conic-gradient(_var(--color-gk-accent)_0deg_111deg,_#333337_111deg_360deg_)] gk-mobile:h-[116px] gk-mobile:w-[116px] [&_b]:absolute [&_b]:top-[50%] [&_b]:left-[50%] [&_b]:h-[2px] [&_b]:w-[36px] [&_b]:[transform-origin:left] [&_b]:[transform:rotate(10deg)] [&_b]:[background:#e9e9e4] [&_i]:absolute [&_i]:top-[50%] [&_i]:left-[50%] [&_i]:h-[2px] [&_i]:w-[48px] [&_i]:[transform-origin:left] [&_i]:[transform:rotate(-115deg)] [&_i]:[background:#e9e9e4] [&::after]:absolute [&::after]:top-[calc(50%_-_3px)] [&::after]:left-[calc(50%_-_3px)] [&::after]:h-[7px] [&::after]:w-[7px] [&::after]:rounded-[50%] [&::after]:[content:''] [&::after]:[background:#ddd] [&::before]:absolute [&::before]:[inset:9px] [&::before]:rounded-[50%] [&::before]:[content:''] [&::before]:[background:#131315]">
                                <i />
                                <b />
                            </div>
                        </div>
                        <div className="gk-timer-collage absolute top-[-24px] right-[21px] h-[185px] w-[285px] gk-compact:right-[-20px] gk-mobile:top-[-10px] gk-mobile:right-[20px] gk-mobile:[transform-origin:top_right] gk-mobile:[transform:scale(0.65)] [&_.gk-print]:absolute [&_.gk-print]:h-[91px] [&_.gk-print]:w-[104px] [&_.gk-print]:p-[3px_3px_10px] [&_>_:nth-child(1)]:top-[15px] [&_>_:nth-child(1)]:left-[38px] [&_>_:nth-child(1)]:[transform:rotate(-2deg)] [&_>_:nth-child(2)]:top-[-8px] [&_>_:nth-child(2)]:left-[179px] [&_>_:nth-child(2)]:[transform:rotate(7deg)] [&_>_:nth-child(3)]:top-[104px] [&_>_:nth-child(3)]:left-[0] [&_>_:nth-child(3)]:[transform:rotate(-8deg)] [&_>_:nth-child(4)]:top-[65px] [&_>_:nth-child(4)]:left-[90px] [&_>_:nth-child(4)]:[transform:rotate(-6deg)] [&_>_:nth-child(5)]:top-[102px] [&_>_:nth-child(5)]:left-[168px] [&_>_:nth-child(5)]:[transform:rotate(3deg)] [&_>_:nth-child(6)]:top-[41px] [&_>_:nth-child(6)]:left-[215px] [&_>_:nth-child(6)]:h-[63px] [&_>_:nth-child(6)]:w-[64px] [&_>_:nth-child(6)]:[transform:rotate(-4deg)]">
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
                        className="gk-feature-drive [grid-column:span_10] h-[270px] gk-small:h-[245px] gk-mobile:h-[294px]"
                    >
                        <div className="gk-drive-line absolute top-[63px] right-[16%] left-[16%] [border-top:2px_dashed_#afbf5290]" />
                        <div className="gk-drive-circle absolute top-[18px] left-[calc(50%_-_44px)] z-[2] flex h-[88px] w-[88px] items-center justify-center rounded-[50%] [background:#252527] gk-mobile:top-[24px] gk-mobile:left-[calc(50%_-_35px)] gk-mobile:h-[70px] gk-mobile:w-[70px]">
                            <DriveMark />
                        </div>
                        <div className="gk-drive-collage absolute [inset:0] [&_.gk-print]:absolute [&_.gk-print]:h-[82px] [&_.gk-print]:w-[80px] [&_.gk-print]:p-[3px_3px_12px] [&_>_:nth-child(1)]:top-[1px] [&_>_:nth-child(1)]:left-[4%] [&_>_:nth-child(1)]:[transform:rotate(8deg)] [&_>_:nth-child(10)]:top-[108px] [&_>_:nth-child(10)]:right-[39%] [&_>_:nth-child(10)]:h-[64px] [&_>_:nth-child(10)]:w-[60px] [&_>_:nth-child(10)]:[transform:rotate(-8deg)] [&_>_:nth-child(2)]:top-[22px] [&_>_:nth-child(2)]:left-[18%] [&_>_:nth-child(2)]:[transform:rotate(-9deg)] [&_>_:nth-child(3)]:top-[89px] [&_>_:nth-child(3)]:left-[0] [&_>_:nth-child(3)]:[transform:rotate(-3deg)] [&_>_:nth-child(4)]:top-[112px] [&_>_:nth-child(4)]:left-[15%] [&_>_:nth-child(4)]:[transform:rotate(5deg)] [&_>_:nth-child(5)]:top-[98px] [&_>_:nth-child(5)]:left-[28%] [&_>_:nth-child(5)]:[transform:rotate(-4deg)] [&_>_:nth-child(6)]:top-[-8px] [&_>_:nth-child(6)]:right-[3%] [&_>_:nth-child(6)]:[transform:rotate(7deg)] [&_>_:nth-child(7)]:top-[64px] [&_>_:nth-child(7)]:right-[14%] [&_>_:nth-child(7)]:[transform:rotate(-11deg)] [&_>_:nth-child(8)]:top-[100px] [&_>_:nth-child(8)]:right-[0] [&_>_:nth-child(8)]:[transform:rotate(-3deg)] [&_>_:nth-child(9)]:top-[111px] [&_>_:nth-child(9)]:right-[24%] [&_>_:nth-child(9)]:[transform:rotate(5deg)] gk-mobile:[&.gk-drive-collage_.gk-print]:h-[59px] gk-mobile:[&.gk-drive-collage_.gk-print]:w-[52px]">
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
