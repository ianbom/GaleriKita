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
            className="relative min-h-145 scroll-mt-20 min-[769px]:[@media(width<=1100px)]:min-h-132.5 [@media(width<=768px)]:min-h-0"
        >
            <div className="relative mx-auto min-h-145 w-[min(100%_-_128px,_1312px)] min-[769px]:[@media(width<=1100px)]:min-h-132.5 min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_80px)] [@media(width<=768px)]:min-h-0 [@media(width<=768px)]:w-[calc(100%_-_40px)]">
                <div className="relative z-3 w-137.5 pt-20 min-[769px]:[@media(width<=1300px)]:w-[47%] [@media(width<=768px)]:w-full [@media(width<=768px)]:pt-12.5">
                    <p className="mb-3.5! text-[12px] font-bold tracking-[2px] text-muted-foreground [@media(width<=768px)]:text-[10px] [@media(width<=768px)]:tracking-[1.6px]">
                        EVERY MOMENT. EVERY PERSPECTIVE.
                    </p>
                    <h1 className="text-[100px] leading-[0.98] font-bold tracking-[-6px] whitespace-nowrap [@media(1100px<width<=1300px)]:text-[84px] min-[769px]:[@media(width<=1100px)]:text-[70px] min-[769px]:[@media(width<=1100px)]:tracking-[-4px] [@media(width<=768px)]:text-[clamp(59px,_10vw,_83px)] [@media(width<=768px)]:tracking-[-3.8px]">
                        Satu acara.
                        <br />
                        <em className="font-serif text-[126px] leading-[0.97] font-normal tracking-[-4px] [@media(1100px<width<=1300px)]:text-[100px] min-[769px]:[@media(width<=1100px)]:text-[84px] [@media(width<=768px)]:text-[clamp(70px,_12vw,_100px)] [@media(width<=768px)]:tracking-[-2.8px]">
                            Sejuta <span className="text-primary">cerita.</span>
                        </em>
                    </h1>
                    <p className="mt-5 max-w-130 text-[18px] leading-[1.45] text-muted-foreground min-[769px]:[@media(width<=1300px)]:max-w-110 min-[769px]:[@media(width<=1300px)]:text-[16px] [@media(width<=768px)]:mt-5.75 [@media(width<=768px)]:max-w-122.5 [@media(width<=768px)]:text-[15px]">
                        Abadikan setiap sudut pandang. Kumpulkan foto dari semua
                        orang dalam satu galeri, cukup dengan satu QR code.
                    </p>
                    <div className="mt-6.25 flex items-center gap-4 min-[769px]:[@media(width<=1300px)]:gap-3 [@media(width<=768px)]:mt-5.5 [@media(width<=768px)]:gap-2.5">
                        <EventLink className="min-[769px]:[@media(width<=1300px)]:px-4.75 min-[769px]:[@media(width<=1300px)]:text-[13px] [@media(width<=768px)]:min-h-11.5 [@media(width<=768px)]:px-3.75 [@media(width<=768px)]:py-3 [@media(width<=768px)]:text-[12px]" />
                        <a
                            href="#cara-kerja"
                            className="inline-flex min-h-13.5 items-center justify-center gap-2 rounded-full border border-[#515154] bg-transparent px-7 py-3.5 text-[15px] font-bold whitespace-nowrap text-foreground transition-[background,border-color] duration-150 ease-[ease] hover:border-foreground hover:bg-[#ffffff08] min-[769px]:[@media(width<=1300px)]:px-4.75 min-[769px]:[@media(width<=1300px)]:text-[13px] [@media(width<=768px)]:min-h-11.5 [@media(width<=768px)]:px-3.75 [@media(width<=768px)]:py-3 [@media(width<=768px)]:text-[12px]"
                        >
                            <Play
                                className="h-5.75 w-5.75 rounded-[50%] border border-[#b1b1b8] p-0.75"
                                size={19}
                                aria-hidden="true"
                            />
                            Lihat Cara Kerja
                        </a>
                    </div>
                    <p className="mt-3.5! flex items-center gap-2 text-[13px] text-muted-foreground [@media(width<=768px)]:mt-3.25! [@media(width<=768px)]:text-[11px]">
                        <Info size={14} aria-hidden="true" />
                        Tanpa perlu akun untuk peserta.
                    </p>
                </div>
                <div
                    className="absolute -top-2.5 left-131.5 h-165 w-207.5 [@media(1100px<width<=1300px)]:left-[43%] [@media(1100px<width<=1300px)]:transform-[scale(0.87)] min-[769px]:[@media(width<=1100px)]:top-10 min-[769px]:[@media(width<=1100px)]:left-[44%] min-[769px]:[@media(width<=1100px)]:transform-[scale(0.7)] min-[769px]:[@media(width<=1300px)]:origin-top-left [@media(width<=768px)]:relative [@media(width<=768px)]:top-auto [@media(width<=768px)]:left-auto [@media(width<=768px)]:mt-7 [@media(width<=768px)]:aspect-[830/670] [@media(width<=768px)]:h-auto [@media(width<=768px)]:w-full min-[550px]:[@media(width<=768px)]:mx-auto min-[550px]:[@media(width<=768px)]:max-w-150"
                    aria-label="Ilustrasi galeri foto kolaboratif"
                >
                    <Print
                        name="hero.graduation"
                        src={assets.hero.graduation}
                        className="absolute top-8 left-3.75 z-2 h-82.5 w-100.5 transform-[rotate(-7deg)] p-1 [@media(width<=768px)]:top-[4.8%] [@media(width<=768px)]:left-[1.8%] [@media(width<=768px)]:h-[49.2%] [@media(width<=768px)]:w-[48.4%] [@media(width<=768px)]:p-0.5 [@media(width<=768px)]:pb-3"
                        eager
                    />
                    <Print
                        name="hero.birthday"
                        src={assets.hero.birthday}
                        className="absolute top-17.5 left-97.5 z-3 h-75.5 w-95 transform-[rotate(10deg)] p-1 [@media(width<=768px)]:top-[12.1%] [@media(width<=768px)]:left-[47%] [@media(width<=768px)]:h-[45.1%] [@media(width<=768px)]:w-[45.8%] [@media(width<=768px)]:p-0.5 [@media(width<=768px)]:pb-3"
                        eager
                    />
                    <Print
                        name="hero.extra"
                        src={assets.hero.extra}
                        className="absolute top-51 left-174.5 z-1 h-47.5 w-37.5 transform-[rotate(10deg)] p-1 [@media(width<=768px)]:top-[30.4%] [@media(width<=768px)]:left-[84.1%] [@media(width<=768px)]:h-[28.4%] [@media(width<=768px)]:w-[18%] [@media(width<=768px)]:p-0.5 [@media(width<=768px)]:pb-3"
                        eager
                    />
                    <Print
                        name="hero.friends"
                        src={assets.hero.friends}
                        className="absolute top-84.25 left-107.5 z-4 h-71.25 w-71.25 transform-[rotate(-5deg)] p-1 [@media(width<=768px)]:top-[50.3%] [@media(width<=768px)]:left-[51.8%] [@media(width<=768px)]:h-[42.5%] [@media(width<=768px)]:w-[34.3%] [@media(width<=768px)]:p-0.5 [@media(width<=768px)]:pb-3"
                        eager
                    />
                    <Print
                        name="hero.wedding"
                        src={assets.hero.wedding}
                        className="absolute top-75 left-41.25 z-5 h-65 w-82.5 transform-[rotate(-8deg)] p-1 pb-6! [@media(width<=768px)]:top-[44.8%] [@media(width<=768px)]:left-[21.1%] [@media(width<=768px)]:h-[38.8%] [@media(width<=768px)]:w-[39.8%] [@media(width<=768px)]:p-0.5 [@media(width<=768px)]:pb-3"
                        eager
                    />
                    <Print
                        name="hero.vacation"
                        src={assets.hero.vacation}
                        className="absolute top-99.25 -left-1 z-6 h-58.75 w-76.75 transform-[rotate(11deg)] p-1 [@media(width<=768px)]:top-[61.3%] [@media(width<=768px)]:left-[-0.5%] [@media(width<=768px)]:h-[35.1%] [@media(width<=768px)]:w-[37%] [@media(width<=768px)]:p-0.5 [@media(width<=768px)]:pb-3"
                        eager
                    />
                    <Print
                        name="hero.background"
                        src={assets.hero.background}
                        className="absolute top-130 left-72.5 z-0 h-115 w-111.25 transform-[rotate(-19deg)] p-1 opacity-4.5 [@media(width<=768px)]:hidden [@media(width<=768px)]:p-0.5 [@media(width<=768px)]:pb-3"
                        eager
                    />
                    <div className="absolute top-11.5 left-131.25 z-7 flex w-64.5 items-center gap-4 rounded-[10px] border border-[#434347] bg-[#19191b] p-3.5 shadow-[0_8px_28px_#0005] [@media(width<=768px)]:top-[6.9%] [@media(width<=768px)]:left-[63%] [@media(width<=768px)]:w-[34%] [@media(width<=768px)]:gap-1.25 [@media(width<=768px)]:rounded-[6px] [@media(width<=768px)]:p-1.75">
                        <div className="relative h-11.25 w-10.5 flex-[0_0_42px] [@media(width<=768px)]:h-6.25 [@media(width<=768px)]:w-5.75 [@media(width<=768px)]:basis-[23px]">
                            {(
                                ['avatar01', 'avatar02', 'avatar03'] as const
                            ).map((key) => (
                                <Photo
                                    className="absolute h-6.75 w-6.75 rounded-[50%] border border-[#777] nth-[2]:left-4.25 nth-[3]:top-4.75 nth-[3]:left-2.25 [@media(width<=768px)]:h-3.75 [@media(width<=768px)]:w-3.75 [@media(width<=768px)]:nth-[2]:left-2.25 [@media(width<=768px)]:nth-[3]:top-2.5 [@media(width<=768px)]:nth-[3]:left-1.25"
                                    key={key}
                                    src={assets.hero[key]}
                                    name={`hero.${key}`}
                                    eager
                                />
                            ))}
                        </div>
                        <p className="flex-[1] text-[12px] [@media(width<=768px)]:text-[7px]">
                            <strong className="block font-semibold">
                                Galeri Reuni 2026
                            </strong>
                            <span className="mt-1.5 block text-[11px] text-muted-foreground [@media(width<=768px)]:mt-0.75 [@media(width<=768px)]:text-[6px]">
                                <b className="text-primary">129</b> Foto
                                Terkumpul
                            </span>
                        </p>
                        <ChevronRight
                            className="text-primary [@media(width<=768px)]:w-2.5"
                            size={20}
                        />
                    </div>
                    <div
                        className="absolute top-66.75 left-153.75 z-8 h-68 w-41.5 transform-[rotate(5deg)] rounded-[11px] border border-[#555] bg-[#111113] p-3.75 shadow-[0_10px_25px_#0009] [@media(width<=768px)]:top-[41.3%] [@media(width<=768px)]:left-[80.1%] [@media(width<=768px)]:h-[40.6%] [@media(width<=768px)]:w-[20%] [@media(width<=768px)]:rounded-[6px] [@media(width<=768px)]:p-1.75"
                        aria-hidden="true"
                    >
                        <div className="h-full bg-[linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary))] bg-size-[14px_3px,3px_14px,14px_3px,3px_14px,14px_3px,3px_14px,14px_3px,3px_14px] bg-position-[left_top,left_top,right_top,right_top,left_bottom,left_bottom,right_bottom,right_bottom] bg-no-repeat! px-0.75 py-4.25 [@media(width<=768px)]:p-[10%_4%]">
                            <p className="mb-5.25 text-center text-[16px] leading-[1.2] [@media(width<=768px)]:mb-[16%] [@media(width<=768px)]:text-[clamp(7px,_1.65vw,_12px)]">
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
        <article className="[@media(width<=768px)]:mx-auto [@media(width<=768px)]:w-[min(100%,_420px)]">
            <div className="flex min-h-34 gap-6.75 min-[769px]:[@media(width<=1300px)]:gap-5.25 [@media(width<=768px)]:min-h-31 [@media(width<=768px)]:gap-6">
                <span className="font-serif text-[109px] leading-[0.85] tracking-[-6px] italic min-[769px]:[@media(width<=1300px)]:text-[94px] [@media(width<=768px)]:text-[92px]">
                    {number}
                </span>
                <div className="mt-5.5 flex-[1] border-t border-t-[#666] pt-5.5 [@media(width<=768px)]:mt-3.5 [@media(width<=768px)]:pt-3.5">
                    <h3 className="text-[23px] font-semibold tracking-[-0.8px] min-[769px]:[@media(width<=1300px)]:text-[20px] [@media(width<=768px)]:text-[21px]">
                        {title}
                    </h3>
                    <p className="mt-2 max-w-62.5 text-[15px] leading-[1.35] text-muted-foreground [@media(width<=768px)]:text-[13px]">
                        {description}
                    </p>
                </div>
            </div>
            <div
                className="relative h-102.5 overflow-hidden [@media(1100px<width<=1300px)]:zoom-[0.85] min-[769px]:[@media(width<=1100px)]:zoom-[0.72] [@media(width<=768px)]:h-93.75"
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
            className="relative min-h-205 scroll-mt-20 pt-11.5 [@media(1100px<width<=1300px)]:min-h-190 min-[769px]:[@media(width<=1100px)]:min-h-177.5 [@media(width<=768px)]:min-h-0 [@media(width<=768px)]:p-0 [@media(width<=768px)]:pt-11.5"
        >
            <div className="relative mx-auto w-[min(100%_-_128px,_1312px)] min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_80px)] [@media(width<=768px)]:w-[calc(100%_-_40px)]">
                <div className="relative z-1 flex items-end justify-between gap-6 [@media(width<=768px)]:flex-col [@media(width<=768px)]:items-start [@media(width<=768px)]:gap-5">
                    <SectionHeading
                        label="CARA KERJA"
                        description="Semudah membuat acara, membagikan QR, dan mengabadikan cerita bersama."
                    >
                        Semua momen,
                        <br />
                        {'dalam '}
                        <em className="font-serif font-normal">
                            tiga langkah.
                        </em>
                    </SectionHeading>
                    <p className="transform-[rotate(-8deg)] pr-1.25 pb-5 font-serif text-[27px] leading-tight tracking-[1px] text-[#949498] italic after:mt-4.25 after:block after:h-px after:w-20 after:transform-[rotate(-9deg)] after:bg-[#666] after:content-[''] [@media(width<=768px)]:hidden">
                        Foto lebih seru
                        <br />
                        kalau dilakukan
                        <br />
                        bersama.
                    </p>
                </div>
                <div className="mt-9 grid grid-cols-3 gap-10.75 min-[769px]:[@media(width<=1300px)]:gap-6.5 [@media(width<=768px)]:mt-8.5 [@media(width<=768px)]:grid-cols-1 [@media(width<=768px)]:gap-8.5">
                    <Step
                        number="01"
                        title="Buat Event"
                        description="Buat acara dan atur galeri sesuai kebutuhanmu."
                    >
                        <div className="relative h-103.75 w-95 max-w-full rounded-[10px] border border-border bg-[linear-gradient(140deg,_#151517,_#0e0e10)] p-4.5 [@media(width<=768px)]:h-96.25 [@media(width<=768px)]:w-full">
                            <Photo
                                className="h-27 rounded-[5px]"
                                src={assets.how.eventCover}
                                name="how.eventCover"
                            />
                            <div className="mt-3.25 rounded-[5px] border border-border p-2.5 text-[15px]">
                                Pernikahan Andi &amp; Sari
                            </div>
                            <div className="mt-2.5 flex gap-2">
                                <span className="flex items-center gap-2 rounded-[5px] border border-border p-1.75 text-[11px] whitespace-nowrap">
                                    <CalendarDays size={14} /> Sab, 14 Jun 2025
                                </span>
                                <span className="flex items-center gap-2 rounded-[5px] border border-border p-1.75 text-[11px] whitespace-nowrap">
                                    <Clock3 size={14} /> 10:00 - selesai
                                </span>
                            </div>
                            <div className="mx-2.25 my-4.5 flex gap-7.5 text-[13px]">
                                <span className="flex items-center gap-2 first:text-primary">
                                    <i className="h-4.25 w-4.25 rounded-[50%] border-5 border-primary" />
                                    Public
                                </span>
                                <span className="flex items-center gap-2">
                                    <i className="h-4.25 w-4.25 rounded-[50%] border-5 border-[#69696d]" />
                                    Private
                                </span>
                            </div>
                            <div className="relative h-30 overflow-hidden rounded-[5px] border border-border">
                                <p className="p-2.25 text-[13px] text-muted-foreground">
                                    Maks. fotografer
                                    <strong className="mt-1.5 block text-foreground">
                                        500 orang
                                    </strong>
                                </p>
                                <Photo
                                    className="absolute top-7.75 -right-4.25 h-25 w-38.75 transform-[rotate(-15deg)] opacity-60"
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
                        <Invitation className="[@media(width<=768px)]:h-83.75 [@media(width<=768px)]:w-[60%] [@media(width<=768px)]:px-3" />
                        <Phone className="absolute top-5 right-px h-106.5 w-52.25 transform-[rotate(4deg)] [@media(width<=768px)]:h-99.25 [@media(width<=768px)]:w-[52%]" />
                    </Step>
                    <Step
                        number="03"
                        title="Abadikan Momen"
                        description="Semua peserta bisa mengambil atau mengunggah foto ke satu album."
                    >
                        <Phone
                            className="absolute top-0 left-0 [@media(width<=768px)]:h-90.5 [@media(width<=768px)]:w-[49%]"
                            camera={assets.how.camera}
                            name="how.camera"
                        />
                        <GalleryPreview
                            previewGridClassName="[@media(width<=768px)]:h-64.75"
                            className="[@media(width<=768px)]:h-89 [@media(width<=768px)]:w-[48%]"
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
    titleClassName = '',
    featureArtClassName = '',
    descriptionClassName = '',
}: {
    title: string;
    description: string;
    icon: ReactNode;
    className?: string;
    children: ReactNode;
    titleClassName?: string;
    featureArtClassName?: string;
    descriptionClassName?: string;
}) {
    return (
        <article
            className={cn(
                'relative col-span-2 h-92.75 overflow-hidden rounded-[12px] border border-border bg-[#111113] bg-[radial-gradient(ellipse_at_top_left,_#21212366,_transparent_65%)] min-[769px]:[@media(width<=1100px)]:h-80.75 [@media(width<=768px)]:col-span-2 [@media(width<=768px)]:h-88',
                className,
            )}
        >
            <div className="relative z-2 flex gap-4 px-5.5 pt-5.25 pb-0 [@media(1100px<width<=1300px)]:gap-3 min-[769px]:[@media(width<=1100px)]:gap-2.5 min-[769px]:[@media(width<=1300px)]:px-4 [@media(width<=768px)]:gap-3.5 [@media(width<=768px)]:px-4.5 [@media(width<=768px)]:pt-4.75 [@media(width<=768px)]:pb-0">
                <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-[#38383c] bg-[#242425] text-[#c2dc61] min-[769px]:[@media(width<=1100px)]:h-9.5 min-[769px]:[@media(width<=1100px)]:w-9.5 [@media(width<=768px)]:h-10.75 [@media(width<=768px)]:w-10.75"
                    aria-hidden="true"
                >
                    {icon}
                </span>
                <div>
                    <h3
                        className={cn(
                            'text-[20px] font-semibold tracking-[-0.6px] [@media(1100px<width<=1300px)]:text-[17px] min-[769px]:[@media(width<=1100px)]:text-[15px] [@media(width<=768px)]:text-[18px]',
                            titleClassName,
                        )}
                    >
                        {title}
                    </h3>
                    <p
                        className={cn(
                            'mt-1.5 text-[14px] leading-[1.4] text-muted-foreground min-[769px]:[@media(width<=1300px)]:text-[12px] [@media(width<=768px)]:text-[13px]',
                            descriptionClassName,
                        )}
                    >
                        {description}
                    </p>
                </div>
            </div>
            <div
                className={cn(
                    'absolute top-24 right-0 bottom-0 left-0 [@media(1100px<width<=1300px)]:zoom-[0.85] min-[769px]:[@media(width<=1100px)]:zoom-[0.7] [@media(width<=768px)]:mx-auto [@media(width<=768px)]:max-w-110',
                    featureArtClassName,
                )}
                aria-hidden="true"
            >
                {children}
            </div>
        </article>
    );
}

function DriveMark({ className = '' }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 48 44"
            className={cn(
                'h-11 w-12.25 [@media(width<=768px)]:h-8.5 [@media(width<=768px)]:w-9.25',
                className,
            )}
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
            className="relative min-h-214.5 scroll-mt-20 pt-7.75 pb-3.5 min-[769px]:[@media(width<=1100px)]:min-h-195 [@media(width<=768px)]:min-h-0 [@media(width<=768px)]:pt-9.5 [@media(width<=768px)]:pb-6"
        >
            <div className="relative mx-auto w-[min(100%_-_88px,_1352px)] min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_48px)] [@media(width<=768px)]:w-[calc(100%_-_40px)]">
                <div className="mb-3.5 flex items-end justify-between gap-6 px-5 [@media(width<=768px)]:flex-col [@media(width<=768px)]:items-start [@media(width<=768px)]:gap-5 [@media(width<=768px)]:px-0">
                    <SectionHeading label="BUILT FOR EVERY MOMENT">
                        Lebih dari
                        <br />
                        {'sekadar galeri '}
                        <em className="font-serif font-normal">foto.</em>
                    </SectionHeading>
                    <div className="flex items-center gap-14 pb-3 text-[16px] text-muted-foreground min-[769px]:[@media(width<=1300px)]:gap-7 min-[769px]:[@media(width<=1300px)]:text-[14px] [@media(width<=768px)]:w-full [@media(width<=768px)]:justify-between [@media(width<=768px)]:gap-3.75 [@media(width<=768px)]:p-0 [@media(width<=768px)]:text-[13px]">
                        <p>
                            Fitur lengkap untuk pengalaman mengabadikan
                            <br className="[@media(width<=768px)]:hidden" />
                            momen yang lebih berkesan, bersama-sama.
                        </p>
                        <DirectionIcons />
                    </div>
                </div>
                <div className="grid grid-cols-24 gap-3 [@media(width<=768px)]:grid-cols-2 [@media(width<=768px)]:gap-3">
                    <Feature
                        titleClassName="max-w-45"
                        title="Scan QR, Langsung Gabung"
                        description=""
                        icon={<ScanQrCode className="h-6.25 w-6.25" />}
                        className="col-span-8"
                    >
                        <Invitation compact />
                        <Phone
                            cameraHintClassName="text-[12px]"
                            className="absolute -top-6.5 right-8.5 h-90 w-42.75 transform-[rotate(4deg)] min-[769px]:[@media(width<=1300px)]:right-2.5 [@media(width<=768px)]:right-6.25"
                            joinClassName="mt-7.5"
                        />
                    </Feature>
                    <Feature
                        title="Kamera dengan Filter & Bingkai"
                        description="Ambil foto dengan gayamu sendiri."
                        icon={<Aperture className="h-6.25 w-6.25" />}
                        className="col-span-9"
                    >
                        <Phone
                            shutterRowClassName="pt-1.5"
                            shutterClassName="h-6.5 w-6.5"
                            notchClassName="h-1.75 w-10"
                            phoneTopClassName="h-3 px-1 text-[6px]"
                            className="absolute top-0.5 left-5.25 h-72 w-37.25 rounded-[21px] p-1.5 [@media(width<=768px)]:left-4.25 [@media(width<=768px)]:h-70 [@media(width<=768px)]:w-31.75"
                            cameraToolsClassName="gap-2.5 text-[5px]"
                            photoClassName="h-49.5 [@media(width<=768px)]:h-49.5"
                            camera={assets.features.camera}
                            name="features.camera"
                        />
                        <div className="absolute top-2.5 right-5.75 left-48.5 grid grid-cols-4 gap-2 min-[769px]:[@media(width<=1300px)]:right-3 min-[769px]:[@media(width<=1300px)]:left-44.25 min-[769px]:[@media(width<=1300px)]:gap-1 [@media(width<=768px)]:right-3.5 [@media(width<=768px)]:left-39.75 [@media(width<=768px)]:gap-1.25">
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
                                        className={cn(
                                            'h-13.75 rounded-[11px] border border-[#727276] [@media(width<=768px)]:h-12.25',
                                            [
                                                '',
                                                'sepia-[0.25]',
                                                'contrast-[1.3]',
                                                'grayscale',
                                            ][index],
                                        )}
                                        src={assets.features[key]}
                                        name={`features.${key}`}
                                    />
                                    <span className="mt-1.75 block text-center text-[9px]">
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
                            className="absolute top-33.75 left-47.5 h-40 w-31.25 transform-[rotate(-12deg)] pb-5.75 min-[769px]:[@media(width<=1300px)]:left-42.5 [@media(width<=768px)]:left-39.5 [@media(width<=768px)]:h-35.25 [@media(width<=768px)]:w-25"
                        />
                        <Print
                            src={assets.features.print02}
                            name="features.print02"
                            className="absolute top-33.75 left-73 h-40 w-31.25 transform-[rotate(12deg)] pb-5.75 min-[769px]:[@media(width<=1300px)]:left-63.25 [@media(width<=768px)]:left-59.75 [@media(width<=768px)]:h-35.25 [@media(width<=768px)]:w-25"
                        />
                    </Feature>
                    <Feature
                        title="Galeri Sesuai Keinginan"
                        description="Atur siapa yang bisa melihat dan kapan foto ditampilkan."
                        icon={<Images className="h-6.25 w-6.25" />}
                        className="col-span-7 [@media(width<=768px)]:h-80.75"
                    >
                        <PrivacyPreview />
                    </Feature>
                    <Feature
                        descriptionClassName="max-w-75 min-[769px]:[@media(width<=1100px)]:max-w-52.5"
                        featureArtClassName="top-23"
                        title="24 Jam Penuh Cerita"
                        description="Periode khusus untuk mengumpulkan foto selama acara."
                        icon={<Clock3 className="h-6.25 w-6.25" />}
                        className="col-span-14 h-67.5 min-[769px]:[@media(width<=1100px)]:h-61.25 [@media(width<=768px)]:h-87.5"
                    >
                        <div className="absolute bottom-5.75 left-11.5 flex items-center gap-8.25 min-[769px]:[@media(width<=1300px)]:left-7.5 min-[769px]:[@media(width<=1300px)]:gap-5.5 [@media(width<=768px)]:bottom-6.25 [@media(width<=768px)]:left-5.5 [@media(width<=768px)]:gap-5">
                            <span className="font-serif text-[76px] leading-none tracking-[-3px] whitespace-nowrap [@media(width<=768px)]:text-[63px]">
                                24 JAM
                            </span>
                            <div className="relative h-36.25 w-36.25 transform-[rotate(-6deg)] rounded-[50%] bg-[conic-gradient(_var(--primary)_0deg_111deg,_#333337_111deg_360deg_)] before:absolute before:inset-2.25 before:rounded-[50%] before:bg-[#131315] before:content-[''] after:absolute after:top-[calc(50%_-_3px)] after:left-[calc(50%_-_3px)] after:h-1.75 after:w-1.75 after:rounded-[50%] after:bg-[#ddd] after:content-[''] [@media(width<=768px)]:h-29 [@media(width<=768px)]:w-29">
                                <i className="absolute top-[50%] left-[50%] h-0.5 w-12 origin-left transform-[rotate(-115deg)] bg-[#e9e9e4]" />
                                <b className="absolute top-[50%] left-[50%] h-0.5 w-9 origin-left transform-[rotate(10deg)] bg-[#e9e9e4]" />
                            </div>
                        </div>
                        <div className="absolute -top-6 right-5.25 h-46.25 w-71.25 min-[769px]:[@media(width<=1300px)]:-right-5 [@media(width<=768px)]:-top-2.5 [@media(width<=768px)]:right-5 [@media(width<=768px)]:origin-top-right [@media(width<=768px)]:transform-[scale(0.65)]">
                            {Array.from({ length: 6 }, (_, index) => {
                                const key =
                                    `timer0${index + 1}` as keyof typeof assets.features;
                                return (
                                    <Print
                                        className={cn(
                                            'absolute h-22.75 w-26 p-0.75 pb-2.5',
                                            index === 0 &&
                                                'top-3.75 left-9.5 transform-[rotate(-2deg)]',
                                            index === 1 &&
                                                '-top-2 left-44.75 transform-[rotate(7deg)]',
                                            index === 2 &&
                                                'top-26 left-0 transform-[rotate(-8deg)]',
                                            index === 3 &&
                                                'top-16.25 left-22.5 transform-[rotate(-6deg)]',
                                            index === 4 &&
                                                'top-25.5 left-42 transform-[rotate(3deg)]',
                                            index === 5 &&
                                                'top-10.25 left-53.75 h-15.75 w-16 transform-[rotate(-4deg)]',
                                        )}
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
                        icon={
                            <DriveMark className="h-6.25 w-6.25 [@media(width<=768px)]:h-6.25 [@media(width<=768px)]:w-6.25" />
                        }
                        className="col-span-10 h-67.5 min-[769px]:[@media(width<=1100px)]:h-61.25 [@media(width<=768px)]:h-73.5"
                    >
                        <div className="absolute top-15.75 right-[16%] left-[16%] border-t-2 border-dashed border-t-[#afbf5290]" />
                        <div className="absolute top-4.5 left-[calc(50%_-_44px)] z-2 flex h-22 w-22 items-center justify-center rounded-[50%] bg-[#252527] [@media(width<=768px)]:top-6 [@media(width<=768px)]:left-[calc(50%_-_35px)] [@media(width<=768px)]:h-17.5 [@media(width<=768px)]:w-17.5">
                            <DriveMark />
                        </div>
                        <div className="absolute inset-0">
                            {Array.from({ length: 10 }, (_, index) => {
                                const key =
                                    `drive${String(index + 1).padStart(2, '0')}` as keyof typeof assets.features;
                                return (
                                    <Print
                                        className={cn(
                                            'absolute h-20.5 w-20 p-0.75 pb-3 [@media(width<=768px)]:h-14.75 [@media(width<=768px)]:w-13',
                                            index === 0 &&
                                                'top-px left-[4%] transform-[rotate(8deg)]',
                                            index === 1 &&
                                                'top-5.5 left-[18%] transform-[rotate(-9deg)]',
                                            index === 2 &&
                                                'top-22.25 left-0 transform-[rotate(-3deg)]',
                                            index === 3 &&
                                                'top-28 left-[15%] transform-[rotate(5deg)]',
                                            index === 4 &&
                                                'top-24.5 left-[28%] transform-[rotate(-4deg)]',
                                            index === 5 &&
                                                '-top-2 right-[3%] transform-[rotate(7deg)]',
                                            index === 6 &&
                                                'top-16 right-[14%] transform-[rotate(-11deg)]',
                                            index === 7 &&
                                                'top-25 right-0 transform-[rotate(-3deg)]',
                                            index === 8 &&
                                                'top-27.75 right-[24%] transform-[rotate(5deg)]',
                                            index === 9 &&
                                                'top-27 right-[39%] h-16 w-15 transform-[rotate(-8deg)] [@media(width<=768px)]:h-14.75 [@media(width<=768px)]:w-13',
                                        )}
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
