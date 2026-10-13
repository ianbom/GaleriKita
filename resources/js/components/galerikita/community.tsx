import { cn } from '@/lib/utils';
import { ArrowRight, Heart } from 'lucide-react';
import { galerikitaAssets as assets } from '@/lib/galerikita-assets';
import {
    DirectionIcons,
    EventLink,
    Photo,
    Print,
    SectionHeading,
} from './primitives';

const galleryColumns = [
    [{ key: 'wedding', user: '@dindaptr', likes: 124 }],
    [
        { key: 'concert', user: '@rafnidiyat', likes: 86 },
        { key: 'couple' },
        { key: 'dinner' },
    ],
    [
        { key: 'friends', user: '@salsabila', likes: 221 },
        { key: 'picnic' },
        { key: 'sunset' },
    ],
    [
        { key: 'vacation', user: '@adityaram', likes: 98 },
        { key: 'traveler' },
        { key: 'photographer' },
    ],
    [{ key: 'graduation', user: '@rabiirawan', likes: 176 }],
] satisfies {
    key: keyof typeof assets.gallery;
    user?: string;
    likes?: number;
}[][];

export function CommunitySection() {
    return (
        <section
            id="galeri"
            className="gk-community gk-section relative min-h-[580px] scroll-mt-[24px] p-[28px_0_12px] [border-bottom:1px_solid_#ffffff0b] gk-mobile:min-h-[0] gk-mobile:p-[34px_0_26px] [&_.gk-description]:mt-[8px] [&_.gk-eyebrow]:mb-[8px]! [&_.gk-heading-row]:mb-[16px] gk-mobile:[&_.gk-heading-row]:mb-[20px] [&_.gk-inset-heading]:px-[44px] gk-compact:[&_.gk-inset-heading]:px-[24px] gk-mobile:[&_.gk-inset-heading]:px-[0] [&_h2]:m-[0] [&_h2]:font-gk-display [&_h2]:text-[60px] [&_h2]:leading-[0.84] [&_h2]:font-normal [&_h2]:tracking-[-0.6px] gk-small:[&_h2]:text-[56px] gk-mobile:[&_h2]:text-[49px] gk-mobile:[&_h2]:tracking-[-1.3px]"
        >
            <div className="gk-container gk-container-gallery relative mx-[auto] w-[min(100%_-_40px,_1400px)] gk-compact:w-[calc(100%_-_32px)] gk-mobile:w-[calc(100%_-_40px)]">
                <div className="gk-heading-row gk-inset-heading flex items-end justify-between gap-[24px] px-[20px] gk-mobile:flex-col gk-mobile:[align-items:start] gk-mobile:gap-[20px] gk-mobile:px-[0]">
                    <SectionHeading
                        label="GALERI BERSAMA"
                        description="Dan setiap sudut pandang menyimpan cerita yang berbeda."
                    >
                        Setiap orang punya
                        <br />
                        <em className="font-gk-display font-normal">
                            sudut pandangnya.
                        </em>
                    </SectionHeading>
                    <div className="gk-heading-aside flex items-center gap-[56px] pb-[12px] text-[16px] text-gk-secondary gk-compact:gap-[28px] gk-compact:text-[14px] gk-mobile:w-[100%] gk-mobile:justify-between gk-mobile:gap-[15px] gk-mobile:p-[0] gk-mobile:text-[13px] gk-mobile:[&_br]:hidden">
                        <p>
                            Momen nyata
                            <br />
                            dari pengguna
                            <br />
                            GaleriKita.
                        </p>
                        <DirectionIcons />
                    </div>
                </div>
                <div
                    className="gk-masonry grid h-[380px] grid-cols-[1.25fr_0.88fr_1.06fr_0.99fr_1.13fr] gap-[12px] gk-mobile:h-[auto] gk-mobile:grid-cols-[1fr_1fr] gk-mobile:gap-[10px] gk-mobile-wide:grid-cols-[repeat(3,_minmax(0,_1fr))] [&_>_.gk-gallery-column-2]:grid-rows-[49%_1fr] [&_>_.gk-gallery-column-3]:grid-rows-[70%_1fr] [&_>_.gk-gallery-column-4]:grid-rows-[54%_1fr] gk-mobile:[&_>_.gk-gallery-column-4]:[grid-column:1] gk-mobile:[&_>_.gk-gallery-column-4]:h-[270px]"
                    aria-label="Contoh komposisi galeri, foto masih placeholder"
                >
                    {galleryColumns.map((column, index) => (
                        <div
                            key={index}
                            className={cn(
                                `gk-gallery-column grid min-w-[0] grid-cols-[1fr_1fr] grid-rows-[58%_1fr] gap-[10px] gk-mobile:h-[290px] gk-mobile:gap-[7px] [&:first-child]:block gk-mobile:[&:first-child]:[grid-row:span_2] gk-mobile:[&:first-child]:h-[590px] gk-mobile-wide:[&:first-child]:[grid-row:auto] gk-mobile-wide:[&:first-child]:h-[290px] [&:last-child]:block gk-mobile:[&:last-child]:[grid-column:2] gk-mobile:[&:last-child]:h-[270px] gk-mobile-wide:[&:last-child]:[grid-column:3] gk-mobile-wide:[&:last-child]:h-[270px] gk-gallery-column-${index + 1}`,
                            )}
                        >
                            {column.map((photo) => (
                                <figure
                                    key={photo.key}
                                    className={cn(
                                        `gk-gallery-photo relative h-[100%] min-h-[0] overflow-hidden rounded-[5px] [&_figcaption]:absolute [&_figcaption]:right-[0] [&_figcaption]:bottom-[0] [&_figcaption]:left-[0] [&_figcaption]:flex [&_figcaption]:items-end [&_figcaption]:justify-between [&_figcaption]:p-[30px_10px_10px] [&_figcaption]:text-[11px] [&_figcaption]:[background:linear-gradient(transparent,_#050506d9)] gk-mobile:[&_figcaption]:px-[8px] gk-mobile:[&_figcaption]:text-[9px] [&_figcaption_span:last-child]:flex [&_figcaption_span:last-child]:items-center [&_figcaption_span:last-child]:gap-2 [&_figcaption_span:last-child]:text-[#ddd] ${photo.user ? 'gk-gallery-main-photo [grid-column:span_2]' : ''}`,
                                    )}
                                >
                                    <Photo
                                        src={assets.gallery[photo.key]}
                                        name={`gallery.${photo.key}`}
                                    />
                                    {'user' in photo && (
                                        <figcaption>
                                            <span>{photo.user}</span>
                                            <span>
                                                <Heart
                                                    size={15}
                                                    aria-hidden="true"
                                                />
                                                {photo.likes}
                                            </span>
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const categories = [
    ['wedding', 'Pernikahan'],
    ['birthday', 'Ulang Tahun'],
    ['graduation', 'Wisuda'],
    ['gathering', 'Gathering'],
    ['vacation', 'Liburan'],
    ['other', 'Acara Lainnya'],
] as const;

export function CategoriesSection() {
    return (
        <section
            id="momen"
            className="gk-moments gk-section relative min-h-[380px] scroll-mt-[24px] p-[24px_0_17px] [border-bottom:1px_solid_#ffffff0b] gk-small:min-h-[330px] gk-mobile:min-h-[0] gk-mobile:p-[30px_0] [&_.gk-eyebrow]:mb-[8px]! [&_h2]:m-[0] [&_h2]:font-gk-display [&_h2]:text-[58px] [&_h2]:leading-[0.82] [&_h2]:font-normal [&_h2]:tracking-[-0.6px] gk-small:[&_h2]:text-[44px] gk-mobile:[&_h2]:text-[45px] gk-mobile:[&_h2]:tracking-[-1.3px]"
        >
            <div className="gk-container gk-container-wide relative mx-[auto] w-[min(100%_-_88px,_1352px)] gk-compact:w-[calc(100%_-_48px)] gk-mobile:w-[calc(100%_-_40px)]">
                <div className="gk-heading-row gk-inset-heading flex items-end justify-between gap-[24px] px-[20px] gk-mobile:flex-col gk-mobile:[align-items:start] gk-mobile:gap-[20px] gk-mobile:px-[0]">
                    <SectionHeading label="UNTUK SETIAP MOMEN">
                        Untuk setiap
                        <br />
                        <em className="font-gk-display font-normal">
                            <span className="gk-accent text-gk-accent">
                                momen
                            </span>
                        </em>{' '}
                        yang berarti.
                    </SectionHeading>
                    <p className="gk-category-description pb-[20px] text-[16px] text-gk-secondary gk-mobile:p-[0] gk-mobile:text-[13px] gk-mobile:[&_br]:hidden">
                        Dari hari spesial hingga petualangan bersama,
                        <br />
                        GaleriKita hadir untuk semua jenis acara.
                    </p>
                </div>
                <div className="gk-categories mt-[19px] grid grid-cols-[repeat(6,_minmax(0,_1fr))] gap-[12px] gk-mobile:mt-[22px] gk-mobile:grid-cols-[repeat(2,_minmax(0,_1fr))] gk-mobile:gap-[10px] gk-mobile-wide:grid-cols-[repeat(3,_minmax(0,_1fr))]">
                    {categories.map(([key, title]) => (
                        <EventLink
                            key={key}
                            className="gk-category relative block h-[208px] min-w-[0] overflow-hidden rounded-[8px] p-[0] [background:#202023] [border:1px_solid_#444449] gk-small:h-[170px] gk-mobile:h-[170px] [&_>_span]:absolute [&_>_span]:[inset:auto_0_0] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-3 [&_>_span]:p-[38px_21px_17px] [&_>_span]:text-[16px] [&_>_span]:font-normal [&_>_span]:text-gk-text [&_>_span]:[background:linear-gradient(transparent,_#09090be6)] gk-compact:[&_>_span]:gap-[5px] gk-compact:[&_>_span]:px-[13px] gk-compact:[&_>_span]:text-[13px] gk-small:[&_>_span]:px-[10px] gk-small:[&_>_span]:text-[11px] gk-mobile:[&_>_span]:gap-[7px] gk-mobile:[&_>_span]:p-[30px_13px_13px] gk-mobile:[&_>_span]:text-[13px] [&_>_svg]:hidden [&:hover]:border-gk-accent [&:hover]:[background:#202023]"
                        >
                            <Photo
                                src={assets.categories[key]}
                                name={`categories.${key}`}
                            />
                            <span>
                                {title}
                                <ArrowRight size={16} aria-hidden="true" />
                            </span>
                        </EventLink>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ClosingSection() {
    return (
        <section
            id="mulai"
            className="gk-closing gk-section relative grid min-h-[318px] scroll-mt-[24px] place-items-center overflow-hidden [border-bottom:1px_solid_#ffffff0b] gk-mobile:min-h-[330px] [&_h2]:m-[0] [&_h2]:font-gk-display [&_h2]:text-[73px] [&_h2]:leading-[0.9] [&_h2]:font-normal [&_h2]:tracking-[-2px] gk-small:[&_h2]:text-[56px] gk-mobile:[&_h2]:text-[51px] gk-mobile:[&_h2]:tracking-[-1.3px] [&_h2_em]:text-gk-accent"
        >
            <div
                className="gk-closing-photos absolute [inset:0] [&_.gk-print]:absolute [&_.gk-print]:h-[213px] [&_.gk-print]:w-[264px] [&_.gk-print]:pb-[15px] [&_.gk-print]:[opacity:0.32] gk-mobile:[&_.gk-print]:h-[145px] gk-mobile:[&_.gk-print]:w-[155px] gk-mobile:[&_.gk-print]:[opacity:0.2] [&_>_.gk-closing-left01]:top-[51px] [&_>_.gk-closing-left01]:left-[-43px] [&_>_.gk-closing-left01]:[transform:rotate(-20deg)] gk-mobile:[&_>_.gk-closing-left01]:left-[-75px] [&_>_.gk-closing-left02]:top-[-71px] [&_>_.gk-closing-left02]:left-[199px] [&_>_.gk-closing-left02]:[transform:rotate(9deg)] gk-mobile:[&_>_.gk-closing-left02]:left-[70px] [&_>_.gk-closing-left03]:top-[124px] [&_>_.gk-closing-left03]:left-[121px] [&_>_.gk-closing-left03]:[transform:rotate(-11deg)] gk-mobile:[&_>_.gk-closing-left03]:top-[220px] gk-mobile:[&_>_.gk-closing-left03]:left-[-50px] [&_>_.gk-closing-left04]:top-[35px] [&_>_.gk-closing-left04]:left-[349px] [&_>_.gk-closing-left04]:[transform:rotate(-6deg)] gk-mobile:[&_>_.gk-closing-left04]:left-[28px] [&_>_.gk-closing-right01]:top-[-51px] [&_>_.gk-closing-right01]:right-[-8px] [&_>_.gk-closing-right01]:[transform:rotate(18deg)] gk-mobile:[&_>_.gk-closing-right01]:right-[-50px] [&_>_.gk-closing-right02]:top-[-11px] [&_>_.gk-closing-right02]:right-[165px] [&_>_.gk-closing-right02]:[transform:rotate(6deg)] gk-mobile:[&_>_.gk-closing-right02]:right-[50px] [&_>_.gk-closing-right03]:top-[124px] [&_>_.gk-closing-right03]:right-[40px] [&_>_.gk-closing-right03]:[transform:rotate(12deg)] gk-mobile:[&_>_.gk-closing-right03]:top-[210px] gk-mobile:[&_>_.gk-closing-right03]:right-[-70px] [&_>_.gk-closing-right04]:top-[127px] [&_>_.gk-closing-right04]:right-[342px] [&_>_.gk-closing-right04]:[transform:rotate(-14deg)] gk-mobile:[&_>_.gk-closing-right04]:top-[260px] gk-mobile:[&_>_.gk-closing-right04]:right-[40px] [&::after]:absolute [&::after]:[inset:0] [&::after]:z-[1] [&::after]:[content:''] [&::after]:[background:linear-gradient(_90deg,_#09090b20,_#09090bf5_38%,_#09090bf5_62%,_#09090b20_),_linear-gradient(#09090b50,_transparent_60%,_#09090b40)] gk-mobile:[&::after]:[background:linear-gradient(_90deg,_#09090b20,_#09090bbb_30%,_#09090bbb_70%,_#09090b20_)]"
                aria-hidden="true"
            >
                {Object.entries(assets.closing).map(([key, src]) => (
                    <Print
                        key={key}
                        src={src}
                        name={`closing.${key}`}
                        className={`gk-closing-${key}`}
                    />
                ))}
            </div>
            <div className="gk-closing-content relative z-[2] p-[35px_20px] text-center [&_.gk-button]:min-h-[48px] [&_.gk-button]:px-[35px] [&_p]:m-[18px_0_20px] [&_p]:text-[16px] gk-mobile:[&_p]:m-[20px_auto] gk-mobile:[&_p]:max-w-[360px] gk-mobile:[&_p]:text-[13px]">
                <h2 className="m-[0] font-gk-display text-[70px] leading-[0.9] font-normal tracking-[-0.6px] gk-small:text-[56px] gk-mobile:text-[49px] gk-mobile:tracking-[-1.3px]">
                    Momen berlalu.
                    <br />
                    <em className="font-gk-display font-normal">
                        Cerita tetap bersama.
                    </em>
                </h2>
                <p>
                    Mulai kumpulkan setiap sudut pandang dalam satu galeri
                    bersama GaleriKita.
                </p>
                <EventLink />
            </div>
        </section>
    );
}
