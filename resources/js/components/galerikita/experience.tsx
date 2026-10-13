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
            className="gk-hero gk-section relative min-h-[580px] scroll-mt-[24px] border-b border-b-[#ffffff0b] [@media(width<550px)]:min-h-[0] min-[769px]:[@media(width<=1100px)]:min-h-[530px] min-[550px]:[@media(width<=768px)]:min-h-[0]"
        >
            <div className="gk-container gk-hero-layout relative mx-[auto] min-h-[580px] w-[min(100%_-_128px,_1312px)] [@media(width<550px)]:min-h-[0] [@media(width<550px)]:w-[calc(100%_-_40px)] min-[769px]:[@media(width<=1100px)]:min-h-[530px] min-[769px]:[@media(width<=1100px)]:w-[calc(100%_-_80px)] min-[550px]:[@media(width<=768px)]:min-h-[0] min-[550px]:[@media(width<=768px)]:w-[calc(100%_-_40px)] [@media(width>1100px)]:[@media(width<=1300px)]:w-[calc(100%_-_80px)]">
                <div className="gk-hero-copy relative z-[3] w-[550px] pt-[80px] [@media(width<550px)]:w-[100%] [@media(width<550px)]:pt-[50px] min-[769px]:[@media(width<=1100px)]:w-[47%] min-[550px]:[@media(width<=768px)]:w-[100%] min-[550px]:[@media(width<=768px)]:pt-[50px] [@media(width>1100px)]:[@media(width<=1300px)]:w-[47%]">
                    <p className="gk-eyebrow mb-[14px]! text-[12px] font-bold tracking-[2px] text-muted-foreground [@media(width<550px)]:text-[10px] [@media(width<550px)]:tracking-[1.6px] min-[550px]:[@media(width<=768px)]:text-[10px] min-[550px]:[@media(width<=768px)]:tracking-[1.6px]">
                        EVERY MOMENT. EVERY PERSPECTIVE.
                    </p>
                    <h1 className="text-[100px] leading-[0.98] font-bold tracking-[-6px] whitespace-nowrap [@media(width<550px)]:text-[clamp(59px,_10vw,_83px)] [@media(width<550px)]:tracking-[-3.8px] min-[769px]:[@media(width<=1100px)]:text-[70px] min-[769px]:[@media(width<=1100px)]:tracking-[-4px] min-[550px]:[@media(width<=768px)]:text-[clamp(59px,_10vw,_83px)] min-[550px]:[@media(width<=768px)]:tracking-[-3.8px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[84px]">
                        Satu acara.
                        <br />
                        <em className="font-serif text-[126px] leading-[0.97] font-normal tracking-[-4px] [@media(width<550px)]:text-[clamp(70px,_12vw,_100px)] [@media(width<550px)]:tracking-[-2.8px] min-[769px]:[@media(width<=1100px)]:text-[84px] min-[550px]:[@media(width<=768px)]:text-[clamp(70px,_12vw,_100px)] min-[550px]:[@media(width<=768px)]:tracking-[-2.8px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[100px]">
                            Sejuta <span className="text-primary">cerita.</span>
                        </em>
                    </h1>
                    <p className="gk-description mt-[20px] max-w-[520px] text-[18px] leading-[1.45] text-muted-foreground [@media(width<550px)]:mt-[23px] [@media(width<550px)]:max-w-[490px] [@media(width<550px)]:text-[15px] min-[769px]:[@media(width<=1100px)]:max-w-[440px] min-[769px]:[@media(width<=1100px)]:text-[16px] min-[550px]:[@media(width<=768px)]:mt-[23px] min-[550px]:[@media(width<=768px)]:max-w-[490px] min-[550px]:[@media(width<=768px)]:text-[15px] [@media(width>1100px)]:[@media(width<=1300px)]:max-w-[440px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[16px]">
                        Abadikan setiap sudut pandang. Kumpulkan foto dari semua
                        orang dalam satu galeri, cukup dengan satu QR code.
                    </p>
                    <div className="gk-hero-actions mt-[25px] flex items-center gap-4 [@media(width<550px)]:mt-[22px] [@media(width<550px)]:gap-[10px] min-[769px]:[@media(width<=1100px)]:gap-[12px] min-[550px]:[@media(width<=768px)]:mt-[22px] min-[550px]:[@media(width<=768px)]:gap-[10px] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[12px]">
                        <EventLink className="[@media(width<550px)]:min-h-[46px] [@media(width<550px)]:p-[12px_15px] [@media(width<550px)]:text-[12px] min-[769px]:[@media(width<=1100px)]:px-[19px] min-[769px]:[@media(width<=1100px)]:text-[13px] min-[550px]:[@media(width<=768px)]:min-h-[46px] min-[550px]:[@media(width<=768px)]:p-[12px_15px] min-[550px]:[@media(width<=768px)]:text-[12px] [@media(width>1100px)]:[@media(width<=1300px)]:px-[19px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[13px]" />
                        <a
                            href="#cara-kerja"
                            className="gk-button gk-button-outline inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[999px] border border-[#515154] bg-transparent p-[14px_28px] text-[15px] font-bold whitespace-nowrap text-foreground transition-[background,border-color] duration-150 ease-[ease] hover:border-foreground hover:bg-[#ffffff08] [@media(width<550px)]:min-h-[46px] [@media(width<550px)]:p-[12px_15px] [@media(width<550px)]:text-[12px] min-[769px]:[@media(width<=1100px)]:px-[19px] min-[769px]:[@media(width<=1100px)]:text-[13px] min-[550px]:[@media(width<=768px)]:min-h-[46px] min-[550px]:[@media(width<=768px)]:p-[12px_15px] min-[550px]:[@media(width<=768px)]:text-[12px] [@media(width>1100px)]:[@media(width<=1300px)]:px-[19px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[13px]"
                        >
                            <Play
                                className="h-[23px] w-[23px] rounded-[50%] border border-[#b1b1b8] p-[3px]"
                                size={19}
                                aria-hidden="true"
                            />
                            Lihat Cara Kerja
                        </a>
                    </div>
                    <p className="gk-note mt-[14px]! flex items-center gap-2 text-[13px] text-muted-foreground [@media(width<550px)]:mt-[13px]! [@media(width<550px)]:text-[11px] min-[550px]:[@media(width<=768px)]:mt-[13px]! min-[550px]:[@media(width<=768px)]:text-[11px]">
                        <Info size={14} aria-hidden="true" />
                        Tanpa perlu akun untuk peserta.
                    </p>
                </div>
                <div
                    className="gk-hero-collage absolute top-[-10px] left-[526px] h-[660px] w-[830px] [@media(width<550px)]:relative [@media(width<550px)]:top-[auto] [@media(width<550px)]:left-[auto] [@media(width<550px)]:mt-[28px] [@media(width<550px)]:aspect-[830/670] [@media(width<550px)]:h-[auto] [@media(width<550px)]:w-[100%] min-[769px]:[@media(width<=1100px)]:top-[40px] min-[769px]:[@media(width<=1100px)]:left-[44%] min-[769px]:[@media(width<=1100px)]:origin-top-left min-[769px]:[@media(width<=1100px)]:transform-[scale(0.7)] min-[550px]:[@media(width<=768px)]:relative min-[550px]:[@media(width<=768px)]:top-[auto] min-[550px]:[@media(width<=768px)]:left-[auto] min-[550px]:[@media(width<=768px)]:mx-[auto] min-[550px]:[@media(width<=768px)]:mt-[28px] min-[550px]:[@media(width<=768px)]:aspect-[830/670] min-[550px]:[@media(width<=768px)]:h-[auto] min-[550px]:[@media(width<=768px)]:w-[100%] min-[550px]:[@media(width<=768px)]:max-w-[600px] [@media(width>1100px)]:[@media(width<=1300px)]:left-[43%] [@media(width>1100px)]:[@media(width<=1300px)]:origin-top-left [@media(width>1100px)]:[@media(width<=1300px)]:transform-[scale(0.87)]"
                    aria-label="Ilustrasi galeri foto kolaboratif"
                >
                    <Print
                        name="hero.graduation"
                        src={assets.hero.graduation}
                        className="gk-hero-graduation absolute top-[32px] left-[15px] z-[2] h-[330px] w-[402px] transform-[rotate(-7deg)] p-[4px] [@media(width<550px)]:top-[4.8%] [@media(width<550px)]:left-[1.8%] [@media(width<550px)]:h-[49.2%] [@media(width<550px)]:w-[48.4%] [@media(width<550px)]:p-[2px_2px_12px] min-[550px]:[@media(width<=768px)]:top-[4.8%] min-[550px]:[@media(width<=768px)]:left-[1.8%] min-[550px]:[@media(width<=768px)]:h-[49.2%] min-[550px]:[@media(width<=768px)]:w-[48.4%] min-[550px]:[@media(width<=768px)]:p-[2px_2px_12px]"
                        eager
                    />
                    <Print
                        name="hero.birthday"
                        src={assets.hero.birthday}
                        className="gk-hero-birthday absolute top-[70px] left-[390px] z-[3] h-[302px] w-[380px] transform-[rotate(10deg)] p-[4px] [@media(width<550px)]:top-[12.1%] [@media(width<550px)]:left-[47%] [@media(width<550px)]:h-[45.1%] [@media(width<550px)]:w-[45.8%] [@media(width<550px)]:p-[2px_2px_12px] min-[550px]:[@media(width<=768px)]:top-[12.1%] min-[550px]:[@media(width<=768px)]:left-[47%] min-[550px]:[@media(width<=768px)]:h-[45.1%] min-[550px]:[@media(width<=768px)]:w-[45.8%] min-[550px]:[@media(width<=768px)]:p-[2px_2px_12px]"
                        eager
                    />
                    <Print
                        name="hero.extra"
                        src={assets.hero.extra}
                        className="gk-hero-extra absolute top-[204px] left-[698px] z-[1] h-[190px] w-[150px] transform-[rotate(10deg)] p-[4px] [@media(width<550px)]:top-[30.4%] [@media(width<550px)]:left-[84.1%] [@media(width<550px)]:h-[28.4%] [@media(width<550px)]:w-[18%] [@media(width<550px)]:p-[2px_2px_12px] min-[550px]:[@media(width<=768px)]:top-[30.4%] min-[550px]:[@media(width<=768px)]:left-[84.1%] min-[550px]:[@media(width<=768px)]:h-[28.4%] min-[550px]:[@media(width<=768px)]:w-[18%] min-[550px]:[@media(width<=768px)]:p-[2px_2px_12px]"
                        eager
                    />
                    <Print
                        name="hero.friends"
                        src={assets.hero.friends}
                        className="gk-hero-friends absolute top-[337px] left-[430px] z-[4] h-[285px] w-[285px] transform-[rotate(-5deg)] p-[4px] [@media(width<550px)]:top-[50.3%] [@media(width<550px)]:left-[51.8%] [@media(width<550px)]:h-[42.5%] [@media(width<550px)]:w-[34.3%] [@media(width<550px)]:p-[2px_2px_12px] min-[550px]:[@media(width<=768px)]:top-[50.3%] min-[550px]:[@media(width<=768px)]:left-[51.8%] min-[550px]:[@media(width<=768px)]:h-[42.5%] min-[550px]:[@media(width<=768px)]:w-[34.3%] min-[550px]:[@media(width<=768px)]:p-[2px_2px_12px]"
                        eager
                    />
                    <Print
                        name="hero.wedding"
                        src={assets.hero.wedding}
                        className="gk-hero-wedding absolute top-[300px] left-[165px] z-[5] h-[260px] w-[330px] transform-[rotate(-8deg)] p-[4px] pb-[24px]! [@media(width<550px)]:top-[44.8%] [@media(width<550px)]:left-[21.1%] [@media(width<550px)]:h-[38.8%] [@media(width<550px)]:w-[39.8%] [@media(width<550px)]:p-[2px_2px_12px] min-[550px]:[@media(width<=768px)]:top-[44.8%] min-[550px]:[@media(width<=768px)]:left-[21.1%] min-[550px]:[@media(width<=768px)]:h-[38.8%] min-[550px]:[@media(width<=768px)]:w-[39.8%] min-[550px]:[@media(width<=768px)]:p-[2px_2px_12px]"
                        eager
                    />
                    <Print
                        name="hero.vacation"
                        src={assets.hero.vacation}
                        className="gk-hero-vacation absolute top-[397px] left-[-4px] z-[6] h-[235px] w-[307px] transform-[rotate(11deg)] p-[4px] [@media(width<550px)]:top-[61.3%] [@media(width<550px)]:left-[-0.5%] [@media(width<550px)]:h-[35.1%] [@media(width<550px)]:w-[37%] [@media(width<550px)]:p-[2px_2px_12px] min-[550px]:[@media(width<=768px)]:top-[61.3%] min-[550px]:[@media(width<=768px)]:left-[-0.5%] min-[550px]:[@media(width<=768px)]:h-[35.1%] min-[550px]:[@media(width<=768px)]:w-[37%] min-[550px]:[@media(width<=768px)]:p-[2px_2px_12px]"
                        eager
                    />
                    <Print
                        name="hero.background"
                        src={assets.hero.background}
                        className="gk-hero-background absolute top-[520px] left-[290px] z-[0] h-[460px] w-[445px] transform-[rotate(-19deg)] p-[4px] opacity-[0.045] [@media(width<550px)]:hidden [@media(width<550px)]:p-[2px_2px_12px] min-[550px]:[@media(width<=768px)]:hidden min-[550px]:[@media(width<=768px)]:p-[2px_2px_12px]"
                        eager
                    />
                    <div className="gk-album-summary absolute top-[46px] left-[525px] z-[7] flex w-[258px] items-center gap-4 rounded-[10px] border border-[#434347] bg-[#19191b] p-[14px] shadow-[0_8px_28px_#0005] [@media(width<550px)]:top-[6.9%] [@media(width<550px)]:left-[63%] [@media(width<550px)]:w-[34%] [@media(width<550px)]:gap-[5px] [@media(width<550px)]:rounded-[6px] [@media(width<550px)]:p-[7px] min-[550px]:[@media(width<=768px)]:top-[6.9%] min-[550px]:[@media(width<=768px)]:left-[63%] min-[550px]:[@media(width<=768px)]:w-[34%] min-[550px]:[@media(width<=768px)]:gap-[5px] min-[550px]:[@media(width<=768px)]:rounded-[6px] min-[550px]:[@media(width<=768px)]:p-[7px]">
                        <div className="gk-album-avatars relative h-[45px] w-[42px] flex-[0_0_42px] [@media(width<550px)]:h-[25px] [@media(width<550px)]:w-[23px] [@media(width<550px)]:basis-[23px] min-[550px]:[@media(width<=768px)]:h-[25px] min-[550px]:[@media(width<=768px)]:w-[23px] min-[550px]:[@media(width<=768px)]:basis-[23px]">
                            {(
                                ['avatar01', 'avatar02', 'avatar03'] as const
                            ).map((key) => (
                                <Photo
                                    className="absolute h-[27px] w-[27px] rounded-[50%] border border-[#777] nth-[2]:left-[17px] nth-[3]:top-[19px] nth-[3]:left-[9px] [@media(width<550px)]:h-[15px] [@media(width<550px)]:w-[15px] [@media(width<550px)]:nth-[2]:left-[9px] [@media(width<550px)]:nth-[3]:top-[10px] [@media(width<550px)]:nth-[3]:left-[5px] min-[550px]:[@media(width<=768px)]:h-[15px] min-[550px]:[@media(width<=768px)]:w-[15px] min-[550px]:[@media(width<=768px)]:nth-[2]:left-[9px] min-[550px]:[@media(width<=768px)]:nth-[3]:top-[10px] min-[550px]:[@media(width<=768px)]:nth-[3]:left-[5px]"
                                    key={key}
                                    src={assets.hero[key]}
                                    name={`hero.${key}`}
                                    eager
                                />
                            ))}
                        </div>
                        <p className="flex-[1] text-[12px] [@media(width<550px)]:text-[7px] min-[550px]:[@media(width<=768px)]:text-[7px]">
                            <strong className="block font-semibold">
                                Galeri Reuni 2026
                            </strong>
                            <span className="mt-[6px] block text-[11px] text-muted-foreground [@media(width<550px)]:mt-[3px] [@media(width<550px)]:text-[6px] min-[550px]:[@media(width<=768px)]:mt-[3px] min-[550px]:[@media(width<=768px)]:text-[6px]">
                                <b className="text-primary">129</b> Foto
                                Terkumpul
                            </span>
                        </p>
                        <ChevronRight
                            className="text-primary [@media(width<550px)]:w-[10px] min-[550px]:[@media(width<=768px)]:w-[10px]"
                            size={20}
                        />
                    </div>
                    <div
                        className="gk-hero-qr absolute top-[267px] left-[615px] z-[8] h-[272px] w-[166px] transform-[rotate(5deg)] rounded-[11px] border border-[#555] bg-[#111113] p-[15px] shadow-[0_10px_25px_#0009] [@media(width<550px)]:top-[41.3%] [@media(width<550px)]:left-[80.1%] [@media(width<550px)]:h-[40.6%] [@media(width<550px)]:w-[20%] [@media(width<550px)]:rounded-[6px] [@media(width<550px)]:p-[7px] min-[550px]:[@media(width<=768px)]:top-[41.3%] min-[550px]:[@media(width<=768px)]:left-[80.1%] min-[550px]:[@media(width<=768px)]:h-[40.6%] min-[550px]:[@media(width<=768px)]:w-[20%] min-[550px]:[@media(width<=768px)]:rounded-[6px] min-[550px]:[@media(width<=768px)]:p-[7px]"
                        aria-hidden="true"
                    >
                        <div className="gk-scan-corners h-[100%] bg-[linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary)),linear-gradient(var(--primary),_var(--primary))] bg-size-[14px_3px,3px_14px,14px_3px,3px_14px,14px_3px,3px_14px,14px_3px,3px_14px] bg-position-[left_top,left_top,right_top,right_top,left_bottom,left_bottom,right_bottom,right_bottom] bg-no-repeat! p-[17px_3px] [@media(width<550px)]:p-[10%_4%] min-[550px]:[@media(width<=768px)]:p-[10%_4%]">
                            <p className="mb-[21px] text-center text-[16px] leading-[1.2] [@media(width<550px)]:mb-[16%] [@media(width<550px)]:text-[clamp(7px,_1.65vw,_12px)] min-[550px]:[@media(width<=768px)]:mb-[16%] min-[550px]:[@media(width<=768px)]:text-[clamp(7px,_1.65vw,_12px)]">
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
        <article className="gk-step [@media(width<550px)]:mx-[auto] [@media(width<550px)]:w-[min(100%,_420px)] min-[550px]:[@media(width<=768px)]:mx-[auto] min-[550px]:[@media(width<=768px)]:w-[min(100%,_420px)]">
            <div className="gk-step-heading flex min-h-[136px] gap-[27px] [@media(width<550px)]:min-h-[124px] [@media(width<550px)]:gap-[24px] min-[769px]:[@media(width<=1100px)]:gap-[21px] min-[550px]:[@media(width<=768px)]:min-h-[124px] min-[550px]:[@media(width<=768px)]:gap-[24px] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[21px]">
                <span className="gk-step-number font-serif text-[109px] leading-[0.85] tracking-[-6px] italic [@media(width<550px)]:text-[92px] min-[769px]:[@media(width<=1100px)]:text-[94px] min-[550px]:[@media(width<=768px)]:text-[92px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[94px]">
                    {number}
                </span>
                <div className="mt-[22px] flex-[1] border-t border-t-[#666] pt-[22px] [@media(width<550px)]:mt-[14px] [@media(width<550px)]:pt-[14px] min-[550px]:[@media(width<=768px)]:mt-[14px] min-[550px]:[@media(width<=768px)]:pt-[14px]">
                    <h3 className="text-[23px] font-semibold tracking-[-0.8px] [@media(width<550px)]:text-[21px] min-[769px]:[@media(width<=1100px)]:text-[20px] min-[550px]:[@media(width<=768px)]:text-[21px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[20px]">
                        {title}
                    </h3>
                    <p className="mt-[8px] max-w-[250px] text-[15px] leading-[1.35] text-muted-foreground [@media(width<550px)]:text-[13px] min-[550px]:[@media(width<=768px)]:text-[13px]">
                        {description}
                    </p>
                </div>
            </div>
            <div
                className="gk-step-art relative h-[410px] overflow-hidden [@media(width<550px)]:h-[375px] min-[769px]:[@media(width<=1100px)]:zoom-[0.72] min-[550px]:[@media(width<=768px)]:h-[375px] [@media(width>1100px)]:[@media(width<=1300px)]:zoom-[0.85]"
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
            className="gk-how gk-section relative min-h-[820px] scroll-mt-[24px] border-b border-b-[#ffffff0b] pt-[46px] [@media(width<550px)]:min-h-[0] [@media(width<550px)]:p-[46px_0_0] min-[769px]:[@media(width<=1100px)]:min-h-[710px] min-[550px]:[@media(width<=768px)]:min-h-[0] min-[550px]:[@media(width<=768px)]:p-[46px_0_0] [@media(width>1100px)]:[@media(width<=1300px)]:min-h-[760px]"
        >
            <div className="gk-container relative mx-[auto] w-[min(100%_-_128px,_1312px)] [@media(width<550px)]:w-[calc(100%_-_40px)] min-[769px]:[@media(width<=1100px)]:w-[calc(100%_-_80px)] min-[550px]:[@media(width<=768px)]:w-[calc(100%_-_40px)] [@media(width>1100px)]:[@media(width<=1300px)]:w-[calc(100%_-_80px)]">
                <div className="gk-heading-row relative z-[1] flex items-end justify-between gap-[24px] [@media(width<550px)]:flex-col [@media(width<550px)]:items-start [@media(width<550px)]:gap-[20px] min-[550px]:[@media(width<=768px)]:flex-col min-[550px]:[@media(width<=768px)]:items-start min-[550px]:[@media(width<=768px)]:gap-[20px]">
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
                    <p className="gk-handwritten transform-[rotate(-8deg)] pr-[5px] pb-[20px] font-serif text-[27px] leading-[1.25] tracking-[1px] text-[#949498] italic after:mt-[17px] after:block after:h-[1px] after:w-[80px] after:transform-[rotate(-9deg)] after:bg-[#666] after:content-[''] [@media(width<550px)]:hidden min-[550px]:[@media(width<=768px)]:hidden">
                        Foto lebih seru
                        <br />
                        kalau dilakukan
                        <br />
                        bersama.
                    </p>
                </div>
                <div className="gk-steps mt-[36px] grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-[43px] [@media(width<550px)]:mt-[34px] [@media(width<550px)]:grid-cols-[1fr] [@media(width<550px)]:gap-[34px] min-[769px]:[@media(width<=1100px)]:gap-[26px] min-[550px]:[@media(width<=768px)]:mt-[34px] min-[550px]:[@media(width<=768px)]:grid-cols-[1fr] min-[550px]:[@media(width<=768px)]:gap-[34px] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[26px]">
                    <Step
                        number="01"
                        title="Buat Event"
                        description="Buat acara dan atur galeri sesuai kebutuhanmu."
                    >
                        <div className="gk-event-preview relative h-[415px] w-[380px] max-w-[100%] rounded-[10px] border border-border bg-[linear-gradient(140deg,_#151517,_#0e0e10)] p-[18px] [@media(width<550px)]:h-[385px] [@media(width<550px)]:w-[100%] min-[550px]:[@media(width<=768px)]:h-[385px] min-[550px]:[@media(width<=768px)]:w-[100%]">
                            <Photo
                                className="h-[108px] rounded-[5px]"
                                src={assets.how.eventCover}
                                name="how.eventCover"
                            />
                            <div className="gk-event-title mt-[13px] rounded-[5px] border border-border p-[10px] text-[15px]">
                                Pernikahan Andi &amp; Sari
                            </div>
                            <div className="gk-event-schedule mt-[10px] flex gap-2">
                                <span className="flex items-center gap-2 rounded-[5px] border border-border p-[7px] text-[11px] whitespace-nowrap">
                                    <CalendarDays size={14} /> Sab, 14 Jun 2025
                                </span>
                                <span className="flex items-center gap-2 rounded-[5px] border border-border p-[7px] text-[11px] whitespace-nowrap">
                                    <Clock3 size={14} /> 10:00 - selesai
                                </span>
                            </div>
                            <div className="gk-event-access m-[18px_9px] flex gap-[30px] text-[13px]">
                                <span className="flex items-center gap-2 first:text-primary">
                                    <i className="h-[17px] w-[17px] rounded-[50%] border-[5px] border-primary" />
                                    Public
                                </span>
                                <span className="flex items-center gap-2">
                                    <i className="h-[17px] w-[17px] rounded-[50%] border-[5px] border-[#69696d]" />
                                    Private
                                </span>
                            </div>
                            <div className="gk-event-capacity relative h-[120px] overflow-hidden rounded-[5px] border border-border">
                                <p className="p-[9px] text-[13px] text-muted-foreground">
                                    Maks. fotografer
                                    <strong className="mt-[6px] block text-foreground">
                                        500 orang
                                    </strong>
                                </p>
                                <Photo
                                    className="absolute top-[31px] right-[-17px] h-[100px] w-[155px] transform-[rotate(-15deg)] opacity-[0.6]"
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
                        <Invitation className="[@media(width<550px)]:h-[335px] [@media(width<550px)]:w-[60%] [@media(width<550px)]:px-[12px] min-[550px]:[@media(width<=768px)]:h-[335px] min-[550px]:[@media(width<=768px)]:w-[60%] min-[550px]:[@media(width<=768px)]:px-[12px]" />
                        <Phone className="gk-how-join-phone absolute top-[20px] right-[1px] h-[426px] w-[209px] transform-[rotate(4deg)] [@media(width<550px)]:h-[397px] [@media(width<550px)]:w-[52%] min-[550px]:[@media(width<=768px)]:h-[397px] min-[550px]:[@media(width<=768px)]:w-[52%]" />
                    </Step>
                    <Step
                        number="03"
                        title="Abadikan Momen"
                        description="Semua peserta bisa mengambil atau mengunggah foto ke satu album."
                    >
                        <Phone
                            className="absolute top-[0] left-[0] [@media(width<550px)]:h-[362px] [@media(width<550px)]:w-[49%] min-[550px]:[@media(width<=768px)]:h-[362px] min-[550px]:[@media(width<=768px)]:w-[49%]"
                            camera={assets.how.camera}
                            name="how.camera"
                        />
                        <GalleryPreview
                            previewGridClassName="[@media(width<550px)]:h-[259px] min-[550px]:[@media(width<=768px)]:h-[259px]"
                            className="[@media(width<550px)]:h-[356px] [@media(width<550px)]:w-[48%] min-[550px]:[@media(width<=768px)]:h-[356px] min-[550px]:[@media(width<=768px)]:w-[48%]"
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
                `gk-feature relative col-[span_2] h-[371px] overflow-hidden rounded-[12px] border border-border bg-[#111113] bg-[radial-gradient(ellipse_at_top_left,_#21212366,_transparent_65%)] [@media(width<550px)]:col-[span_2] [@media(width<550px)]:h-[352px] min-[769px]:[@media(width<=1100px)]:h-[323px] min-[550px]:[@media(width<=768px)]:col-[span_2] min-[550px]:[@media(width<=768px)]:h-[352px] ${className}`,
            )}
        >
            <div className="gk-feature-heading relative z-[2] flex gap-[16px] p-[21px_22px_0] [@media(width<550px)]:gap-[14px] [@media(width<550px)]:p-[19px_18px_0] min-[769px]:[@media(width<=1100px)]:gap-[10px] min-[769px]:[@media(width<=1100px)]:px-[16px] min-[550px]:[@media(width<=768px)]:gap-[14px] min-[550px]:[@media(width<=768px)]:p-[19px_18px_0] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[12px] [@media(width>1100px)]:[@media(width<=1300px)]:px-[16px]">
                <span
                    className="gk-feature-icon flex h-[48px] w-[48px] shrink-[0] items-center justify-center rounded-[12px] border border-[#38383c] bg-[#242425] text-[#c2dc61] [@media(width<550px)]:h-[43px] [@media(width<550px)]:w-[43px] min-[769px]:[@media(width<=1100px)]:h-[38px] min-[769px]:[@media(width<=1100px)]:w-[38px] min-[550px]:[@media(width<=768px)]:h-[43px] min-[550px]:[@media(width<=768px)]:w-[43px]"
                    aria-hidden="true"
                >
                    {icon}
                </span>
                <div>
                    <h3
                        className={cn(
                            'text-[20px] font-semibold tracking-[-0.6px] [@media(width<550px)]:text-[18px] min-[769px]:[@media(width<=1100px)]:text-[15px] min-[550px]:[@media(width<=768px)]:text-[18px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[17px]',
                            titleClassName,
                        )}
                    >
                        {title}
                    </h3>
                    <p
                        className={cn(
                            'mt-[6px] text-[14px] leading-[1.4] text-muted-foreground [@media(width<550px)]:text-[13px] min-[769px]:[@media(width<=1100px)]:text-[12px] min-[550px]:[@media(width<=768px)]:text-[13px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[12px]',
                            descriptionClassName,
                        )}
                    >
                        {description}
                    </p>
                </div>
            </div>
            <div
                className={cn(
                    'gk-feature-art absolute top-[96px] right-[0] bottom-[0] left-[0] [@media(width<550px)]:mx-[auto] [@media(width<550px)]:max-w-[440px] min-[769px]:[@media(width<=1100px)]:zoom-[0.7] min-[550px]:[@media(width<=768px)]:mx-[auto] min-[550px]:[@media(width<=768px)]:max-w-[440px] [@media(width>1100px)]:[@media(width<=1300px)]:zoom-[0.85]',
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
                'gk-drive-mark h-[44px] w-[49px] [@media(width<550px)]:h-[34px] [@media(width<550px)]:w-[37px] min-[550px]:[@media(width<=768px)]:h-[34px] min-[550px]:[@media(width<=768px)]:w-[37px]',
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
            className="gk-features gk-section relative min-h-[858px] scroll-mt-[24px] border-b border-b-[#ffffff0b] p-[31px_0_14px] [@media(width<550px)]:min-h-[0] [@media(width<550px)]:p-[38px_0_24px] min-[769px]:[@media(width<=1100px)]:min-h-[780px] min-[550px]:[@media(width<=768px)]:min-h-[0] min-[550px]:[@media(width<=768px)]:p-[38px_0_24px]"
        >
            <div className="gk-container gk-container-wide relative mx-[auto] w-[min(100%_-_88px,_1352px)] [@media(width<550px)]:w-[calc(100%_-_40px)] min-[769px]:[@media(width<=1100px)]:w-[calc(100%_-_48px)] min-[550px]:[@media(width<=768px)]:w-[calc(100%_-_40px)] [@media(width>1100px)]:[@media(width<=1300px)]:w-[calc(100%_-_48px)]">
                <div className="gk-heading-row gk-inset-heading mb-[14px] flex items-end justify-between gap-[24px] px-[20px] [@media(width<550px)]:flex-col [@media(width<550px)]:items-start [@media(width<550px)]:gap-[20px] [@media(width<550px)]:px-[0] min-[550px]:[@media(width<=768px)]:flex-col min-[550px]:[@media(width<=768px)]:items-start min-[550px]:[@media(width<=768px)]:gap-[20px] min-[550px]:[@media(width<=768px)]:px-[0]">
                    <SectionHeading label="BUILT FOR EVERY MOMENT">
                        Lebih dari
                        <br />
                        {'sekadar galeri '}
                        <em className="font-serif font-normal">foto.</em>
                    </SectionHeading>
                    <div className="gk-heading-aside flex items-center gap-[56px] pb-[12px] text-[16px] text-muted-foreground [@media(width<550px)]:w-[100%] [@media(width<550px)]:justify-between [@media(width<550px)]:gap-[15px] [@media(width<550px)]:p-[0] [@media(width<550px)]:text-[13px] min-[769px]:[@media(width<=1100px)]:gap-[28px] min-[769px]:[@media(width<=1100px)]:text-[14px] min-[550px]:[@media(width<=768px)]:w-[100%] min-[550px]:[@media(width<=768px)]:justify-between min-[550px]:[@media(width<=768px)]:gap-[15px] min-[550px]:[@media(width<=768px)]:p-[0] min-[550px]:[@media(width<=768px)]:text-[13px] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[28px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[14px]">
                        <p>
                            Fitur lengkap untuk pengalaman mengabadikan
                            <br className="[@media(width<550px)]:hidden min-[550px]:[@media(width<=768px)]:hidden" />
                            momen yang lebih berkesan, bersama-sama.
                        </p>
                        <DirectionIcons />
                    </div>
                </div>
                <div className="gk-bento grid grid-cols-[repeat(24,_minmax(0,_1fr))] gap-[12px] [@media(width<550px)]:grid-cols-[repeat(2,_minmax(0,_1fr))] [@media(width<550px)]:gap-[12px] min-[550px]:[@media(width<=768px)]:grid-cols-[repeat(2,_minmax(0,_1fr))] min-[550px]:[@media(width<=768px)]:gap-[12px]">
                    <Feature
                        titleClassName="max-w-[180px]"
                        title="Scan QR, Langsung Gabung"
                        description=""
                        icon={<ScanQrCode className="h-[25px] w-[25px]" />}
                        className="gk-feature-qr col-[span_8]"
                    >
                        <Invitation compact />
                        <Phone
                            cameraHintClassName="text-[12px]"
                            className="absolute top-[-26px] right-[34px] h-[360px] w-[171px] transform-[rotate(4deg)] [@media(width<550px)]:right-[25px] min-[769px]:[@media(width<=1100px)]:right-[10px] min-[550px]:[@media(width<=768px)]:right-[25px] [@media(width>1100px)]:[@media(width<=1300px)]:right-[10px]"
                            joinClassName="mt-[30px]"
                        />
                    </Feature>
                    <Feature
                        title="Kamera dengan Filter & Bingkai"
                        description="Ambil foto dengan gayamu sendiri."
                        icon={<Aperture className="h-[25px] w-[25px]" />}
                        className="gk-feature-camera col-[span_9]"
                    >
                        <Phone
                            shutterRowClassName="pt-[6px]"
                            shutterClassName="h-[26px] w-[26px]"
                            notchClassName="h-[7px] w-[40px]"
                            phoneTopClassName="h-[12px] p-[0_4px] text-[6px]"
                            className="absolute top-[2px] left-[21px] h-[288px] w-[149px] rounded-[21px] p-[6px] [@media(width<550px)]:left-[17px] [@media(width<550px)]:h-[280px] [@media(width<550px)]:w-[127px] min-[550px]:[@media(width<=768px)]:left-[17px] min-[550px]:[@media(width<=768px)]:h-[280px] min-[550px]:[@media(width<=768px)]:w-[127px]"
                            cameraToolsClassName="gap-[10px] text-[5px]"
                            photoClassName="h-[198px] [@media(width<550px)]:h-[198px] min-[550px]:[@media(width<=768px)]:h-[198px]"
                            camera={assets.features.camera}
                            name="features.camera"
                        />
                        <div className="gk-filters absolute top-[10px] right-[23px] left-[194px] grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-[8px] [@media(width<550px)]:right-[14px] [@media(width<550px)]:left-[159px] [@media(width<550px)]:gap-[5px] min-[769px]:[@media(width<=1100px)]:right-[12px] min-[769px]:[@media(width<=1100px)]:left-[177px] min-[769px]:[@media(width<=1100px)]:gap-[4px] min-[550px]:[@media(width<=768px)]:right-[14px] min-[550px]:[@media(width<=768px)]:left-[159px] min-[550px]:[@media(width<=768px)]:gap-[5px] [@media(width>1100px)]:[@media(width<=1300px)]:right-[12px] [@media(width>1100px)]:[@media(width<=1300px)]:left-[177px] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[4px]">
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
                                            'h-[55px] rounded-[11px] border border-[#727276] [@media(width<550px)]:h-[49px] min-[550px]:[@media(width<=768px)]:h-[49px]',
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
                                    <span className="mt-[7px] block text-center text-[9px]">
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
                            className="gk-feature-print-one absolute top-[135px] left-[190px] h-[160px] w-[125px] transform-[rotate(-12deg)] p-[5px_5px_23px] [@media(width<550px)]:left-[158px] [@media(width<550px)]:h-[141px] [@media(width<550px)]:w-[100px] min-[769px]:[@media(width<=1100px)]:left-[170px] min-[550px]:[@media(width<=768px)]:left-[158px] min-[550px]:[@media(width<=768px)]:h-[141px] min-[550px]:[@media(width<=768px)]:w-[100px] [@media(width>1100px)]:[@media(width<=1300px)]:left-[170px]"
                        />
                        <Print
                            src={assets.features.print02}
                            name="features.print02"
                            className="gk-feature-print-two absolute top-[135px] left-[292px] h-[160px] w-[125px] transform-[rotate(12deg)] p-[5px_5px_23px] [@media(width<550px)]:left-[239px] [@media(width<550px)]:h-[141px] [@media(width<550px)]:w-[100px] min-[769px]:[@media(width<=1100px)]:left-[253px] min-[550px]:[@media(width<=768px)]:left-[239px] min-[550px]:[@media(width<=768px)]:h-[141px] min-[550px]:[@media(width<=768px)]:w-[100px] [@media(width>1100px)]:[@media(width<=1300px)]:left-[253px]"
                        />
                    </Feature>
                    <Feature
                        title="Galeri Sesuai Keinginan"
                        description="Atur siapa yang bisa melihat dan kapan foto ditampilkan."
                        icon={<Images className="h-[25px] w-[25px]" />}
                        className="gk-feature-privacy col-[span_7] [@media(width<550px)]:h-[323px] min-[550px]:[@media(width<=768px)]:h-[323px]"
                    >
                        <PrivacyPreview />
                    </Feature>
                    <Feature
                        descriptionClassName="max-w-[300px] min-[769px]:[@media(width<=1100px)]:max-w-[210px]"
                        featureArtClassName="top-[92px]"
                        title="24 Jam Penuh Cerita"
                        description="Periode khusus untuk mengumpulkan foto selama acara."
                        icon={<Clock3 className="h-[25px] w-[25px]" />}
                        className="gk-feature-timer col-[span_14] h-[270px] [@media(width<550px)]:h-[350px] min-[769px]:[@media(width<=1100px)]:h-[245px] min-[550px]:[@media(width<=768px)]:h-[350px]"
                    >
                        <div className="gk-timer-display absolute bottom-[23px] left-[46px] flex items-center gap-[33px] [@media(width<550px)]:bottom-[25px] [@media(width<550px)]:left-[22px] [@media(width<550px)]:gap-[20px] min-[769px]:[@media(width<=1100px)]:left-[30px] min-[769px]:[@media(width<=1100px)]:gap-[22px] min-[550px]:[@media(width<=768px)]:bottom-[25px] min-[550px]:[@media(width<=768px)]:left-[22px] min-[550px]:[@media(width<=768px)]:gap-[20px] [@media(width>1100px)]:[@media(width<=1300px)]:left-[30px] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[22px]">
                            <span className="font-serif text-[76px] leading-[1] tracking-[-3px] whitespace-nowrap [@media(width<550px)]:text-[63px] min-[550px]:[@media(width<=768px)]:text-[63px]">
                                24 JAM
                            </span>
                            <div className="gk-clock relative h-[145px] w-[145px] transform-[rotate(-6deg)] rounded-[50%] bg-[conic-gradient(_var(--primary)_0deg_111deg,_#333337_111deg_360deg_)] before:absolute before:inset-[9px] before:rounded-[50%] before:bg-[#131315] before:content-[''] after:absolute after:top-[calc(50%_-_3px)] after:left-[calc(50%_-_3px)] after:h-[7px] after:w-[7px] after:rounded-[50%] after:bg-[#ddd] after:content-[''] [@media(width<550px)]:h-[116px] [@media(width<550px)]:w-[116px] min-[550px]:[@media(width<=768px)]:h-[116px] min-[550px]:[@media(width<=768px)]:w-[116px]">
                                <i className="absolute top-[50%] left-[50%] h-[2px] w-[48px] origin-left transform-[rotate(-115deg)] bg-[#e9e9e4]" />
                                <b className="absolute top-[50%] left-[50%] h-[2px] w-[36px] origin-left transform-[rotate(10deg)] bg-[#e9e9e4]" />
                            </div>
                        </div>
                        <div className="gk-timer-collage absolute top-[-24px] right-[21px] h-[185px] w-[285px] [@media(width<550px)]:top-[-10px] [@media(width<550px)]:right-[20px] [@media(width<550px)]:origin-top-right [@media(width<550px)]:transform-[scale(0.65)] min-[769px]:[@media(width<=1100px)]:right-[-20px] min-[550px]:[@media(width<=768px)]:top-[-10px] min-[550px]:[@media(width<=768px)]:right-[20px] min-[550px]:[@media(width<=768px)]:origin-top-right min-[550px]:[@media(width<=768px)]:transform-[scale(0.65)] [@media(width>1100px)]:[@media(width<=1300px)]:right-[-20px]">
                            {Array.from({ length: 6 }, (_, index) => {
                                const key =
                                    `timer0${index + 1}` as keyof typeof assets.features;
                                return (
                                    <Print
                                        className="absolute h-[91px] w-[104px] p-[3px_3px_10px] nth-[1]:top-[15px] nth-[1]:left-[38px] nth-[1]:transform-[rotate(-2deg)] nth-[2]:top-[-8px] nth-[2]:left-[179px] nth-[2]:transform-[rotate(7deg)] nth-[3]:top-[104px] nth-[3]:left-[0] nth-[3]:transform-[rotate(-8deg)] nth-[4]:top-[65px] nth-[4]:left-[90px] nth-[4]:transform-[rotate(-6deg)] nth-[5]:top-[102px] nth-[5]:left-[168px] nth-[5]:transform-[rotate(3deg)] nth-[6]:top-[41px] nth-[6]:left-[215px] nth-[6]:h-[63px] nth-[6]:w-[64px] nth-[6]:transform-[rotate(-4deg)]"
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
                            <DriveMark className="h-[25px] w-[25px] [@media(width<550px)]:h-[25px] [@media(width<550px)]:w-[25px] min-[550px]:[@media(width<=768px)]:h-[25px] min-[550px]:[@media(width<=768px)]:w-[25px]" />
                        }
                        className="gk-feature-drive col-[span_10] h-[270px] [@media(width<550px)]:h-[294px] min-[769px]:[@media(width<=1100px)]:h-[245px] min-[550px]:[@media(width<=768px)]:h-[294px]"
                    >
                        <div className="gk-drive-line absolute top-[63px] right-[16%] left-[16%] border-t-[2px] border-dashed border-t-[#afbf5290]" />
                        <div className="gk-drive-circle absolute top-[18px] left-[calc(50%_-_44px)] z-[2] flex h-[88px] w-[88px] items-center justify-center rounded-[50%] bg-[#252527] [@media(width<550px)]:top-[24px] [@media(width<550px)]:left-[calc(50%_-_35px)] [@media(width<550px)]:h-[70px] [@media(width<550px)]:w-[70px] min-[550px]:[@media(width<=768px)]:top-[24px] min-[550px]:[@media(width<=768px)]:left-[calc(50%_-_35px)] min-[550px]:[@media(width<=768px)]:h-[70px] min-[550px]:[@media(width<=768px)]:w-[70px]">
                            <DriveMark />
                        </div>
                        <div className="gk-drive-collage absolute inset-[0]">
                            {Array.from({ length: 10 }, (_, index) => {
                                const key =
                                    `drive${String(index + 1).padStart(2, '0')}` as keyof typeof assets.features;
                                return (
                                    <Print
                                        className="absolute h-[82px] w-[80px] p-[3px_3px_12px] nth-[1]:top-[1px] nth-[1]:left-[4%] nth-[1]:transform-[rotate(8deg)] nth-[10]:top-[108px] nth-[10]:right-[39%] nth-[10]:h-[64px] nth-[10]:w-[60px] nth-[10]:transform-[rotate(-8deg)] nth-[2]:top-[22px] nth-[2]:left-[18%] nth-[2]:transform-[rotate(-9deg)] nth-[3]:top-[89px] nth-[3]:left-[0] nth-[3]:transform-[rotate(-3deg)] nth-[4]:top-[112px] nth-[4]:left-[15%] nth-[4]:transform-[rotate(5deg)] nth-[5]:top-[98px] nth-[5]:left-[28%] nth-[5]:transform-[rotate(-4deg)] nth-[6]:top-[-8px] nth-[6]:right-[3%] nth-[6]:transform-[rotate(7deg)] nth-[7]:top-[64px] nth-[7]:right-[14%] nth-[7]:transform-[rotate(-11deg)] nth-[8]:top-[100px] nth-[8]:right-[0] nth-[8]:transform-[rotate(-3deg)] nth-[9]:top-[111px] nth-[9]:right-[24%] nth-[9]:transform-[rotate(5deg)] [@media(width<550px)]:h-[59px] [@media(width<550px)]:w-[52px] [@media(width<550px)]:nth-[10]:h-[59px] [@media(width<550px)]:nth-[10]:w-[52px] min-[550px]:[@media(width<=768px)]:h-[59px] min-[550px]:[@media(width<=768px)]:w-[52px] min-[550px]:[@media(width<=768px)]:nth-[10]:h-[59px] min-[550px]:[@media(width<=768px)]:nth-[10]:w-[52px]"
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
