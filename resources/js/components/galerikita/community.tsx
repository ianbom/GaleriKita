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
            className="gk-community gk-section relative min-h-[580px] scroll-mt-[24px] border-b border-b-[#ffffff0b] p-[28px_0_12px] [@media(width<550px)]:min-h-[0] [@media(width<550px)]:p-[34px_0_26px] min-[550px]:[@media(width<=768px)]:min-h-[0] min-[550px]:[@media(width<=768px)]:p-[34px_0_26px]"
        >
            <div className="gk-container gk-container-gallery relative mx-[auto] w-[min(100%_-_40px,_1400px)] [@media(width<550px)]:w-[calc(100%_-_40px)] min-[769px]:[@media(width<=1100px)]:w-[calc(100%_-_32px)] min-[550px]:[@media(width<=768px)]:w-[calc(100%_-_40px)] [@media(width>1100px)]:[@media(width<=1300px)]:w-[calc(100%_-_32px)]">
                <div className="gk-heading-row gk-inset-heading mb-[16px] flex items-end justify-between gap-[24px] px-[44px] [@media(width<550px)]:mb-[20px] [@media(width<550px)]:flex-col [@media(width<550px)]:items-start [@media(width<550px)]:gap-[20px] [@media(width<550px)]:px-[0] min-[769px]:[@media(width<=1100px)]:px-[24px] min-[550px]:[@media(width<=768px)]:mb-[20px] min-[550px]:[@media(width<=768px)]:flex-col min-[550px]:[@media(width<=768px)]:items-start min-[550px]:[@media(width<=768px)]:gap-[20px] min-[550px]:[@media(width<=768px)]:px-[0] [@media(width>1100px)]:[@media(width<=1300px)]:px-[24px]">
                    <SectionHeading
                        eyebrowClassName="mb-[8px]!"
                        descriptionClassName="mt-[8px]"
                        headingClassName="m-[0] font-serif text-[60px] leading-[0.84] font-normal tracking-[-0.6px] min-[769px]:[@media(width<=1100px)]:text-[56px] [@media(width<550px)]:text-[49px] min-[550px]:[@media(width<=768px)]:text-[49px] [@media(width<550px)]:tracking-[-1.3px] min-[550px]:[@media(width<=768px)]:tracking-[-1.3px]"
                        label="GALERI BERSAMA"
                        description="Dan setiap sudut pandang menyimpan cerita yang berbeda."
                    >
                        Setiap orang punya
                        <br />
                        <em className="font-serif font-normal">
                            sudut pandangnya.
                        </em>
                    </SectionHeading>
                    <div className="gk-heading-aside flex items-center gap-[56px] pb-[12px] text-[16px] text-muted-foreground [@media(width<550px)]:w-[100%] [@media(width<550px)]:justify-between [@media(width<550px)]:gap-[15px] [@media(width<550px)]:p-[0] [@media(width<550px)]:text-[13px] min-[769px]:[@media(width<=1100px)]:gap-[28px] min-[769px]:[@media(width<=1100px)]:text-[14px] min-[550px]:[@media(width<=768px)]:w-[100%] min-[550px]:[@media(width<=768px)]:justify-between min-[550px]:[@media(width<=768px)]:gap-[15px] min-[550px]:[@media(width<=768px)]:p-[0] min-[550px]:[@media(width<=768px)]:text-[13px] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[28px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[14px]">
                        <p>
                            Momen nyata
                            <br className="[@media(width<550px)]:hidden min-[550px]:[@media(width<=768px)]:hidden" />
                            dari pengguna
                            <br className="[@media(width<550px)]:hidden min-[550px]:[@media(width<=768px)]:hidden" />
                            GaleriKita.
                        </p>
                        <DirectionIcons />
                    </div>
                </div>
                <div
                    className="gk-masonry grid h-[380px] grid-cols-[1.25fr_0.88fr_1.06fr_0.99fr_1.13fr] gap-[12px] [@media(width<550px)]:h-[auto] [@media(width<550px)]:grid-cols-[1fr_1fr] [@media(width<550px)]:gap-[10px] min-[550px]:[@media(width<=768px)]:h-[auto] min-[550px]:[@media(width<=768px)]:grid-cols-[repeat(3,_minmax(0,_1fr))] min-[550px]:[@media(width<=768px)]:gap-[10px]"
                    aria-label="Contoh komposisi galeri, foto masih placeholder"
                >
                    {galleryColumns.map((column, index) => (
                        <div
                            key={index}
                            className={cn(
                                `gk-gallery-column grid min-w-[0] grid-cols-[1fr_1fr] grid-rows-[58%_1fr] gap-[10px] first:block last:block [@media(width<550px)]:h-[290px] [@media(width<550px)]:gap-[7px] [@media(width<550px)]:first:row-[span_2] [@media(width<550px)]:first:h-[590px] [@media(width<550px)]:last:col-[2] [@media(width<550px)]:last:h-[270px] min-[550px]:[@media(width<=768px)]:h-[290px] min-[550px]:[@media(width<=768px)]:gap-[7px] min-[550px]:[@media(width<=768px)]:first:row-[auto] min-[550px]:[@media(width<=768px)]:first:h-[290px] min-[550px]:[@media(width<=768px)]:last:col-[3] min-[550px]:[@media(width<=768px)]:last:h-[270px] gk-gallery-column-${index + 1}`,
                                'nth-[2]:grid-rows-[49%_1fr] nth-[3]:grid-rows-[70%_1fr] nth-[4]:grid-rows-[54%_1fr] [@media(width<550px)]:nth-[4]:col-[1] [@media(width<550px)]:nth-[4]:h-[270px] min-[550px]:[@media(width<=768px)]:nth-[4]:col-[1] min-[550px]:[@media(width<=768px)]:nth-[4]:h-[270px]',
                            )}
                        >
                            {column.map((photo) => (
                                <figure
                                    key={photo.key}
                                    className={cn(
                                        `gk-gallery-photo relative h-[100%] min-h-[0] overflow-hidden rounded-[5px] ${photo.user ? 'gk-gallery-main-photo col-[span_2]' : ''}`,
                                    )}
                                >
                                    <Photo
                                        src={assets.gallery[photo.key]}
                                        name={`gallery.${photo.key}`}
                                    />
                                    {'user' in photo && (
                                        <figcaption className="absolute right-[0] bottom-[0] left-[0] flex items-end justify-between bg-[linear-gradient(transparent,_#050506d9)] p-[30px_10px_10px] text-[11px] [@media(width<550px)]:px-[8px] [@media(width<550px)]:text-[9px] min-[550px]:[@media(width<=768px)]:px-[8px] min-[550px]:[@media(width<=768px)]:text-[9px]">
                                            <span>{photo.user}</span>
                                            <span className="last:flex last:items-center last:gap-2 last:text-[#ddd]">
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
            className="gk-moments gk-section relative min-h-[380px] scroll-mt-[24px] border-b border-b-[#ffffff0b] p-[24px_0_17px] [@media(width<550px)]:min-h-[0] [@media(width<550px)]:p-[30px_0] min-[769px]:[@media(width<=1100px)]:min-h-[330px] min-[550px]:[@media(width<=768px)]:min-h-[0] min-[550px]:[@media(width<=768px)]:p-[30px_0]"
        >
            <div className="gk-container gk-container-wide relative mx-[auto] w-[min(100%_-_88px,_1352px)] [@media(width<550px)]:w-[calc(100%_-_40px)] min-[769px]:[@media(width<=1100px)]:w-[calc(100%_-_48px)] min-[550px]:[@media(width<=768px)]:w-[calc(100%_-_40px)] [@media(width>1100px)]:[@media(width<=1300px)]:w-[calc(100%_-_48px)]">
                <div className="gk-heading-row gk-inset-heading flex items-end justify-between gap-[24px] px-[20px] [@media(width<550px)]:flex-col [@media(width<550px)]:items-start [@media(width<550px)]:gap-[20px] [@media(width<550px)]:px-[0] min-[550px]:[@media(width<=768px)]:flex-col min-[550px]:[@media(width<=768px)]:items-start min-[550px]:[@media(width<=768px)]:gap-[20px] min-[550px]:[@media(width<=768px)]:px-[0]">
                    <SectionHeading
                        eyebrowClassName="mb-[8px]!"
                        headingClassName="m-[0] font-serif text-[58px] leading-[0.82] font-normal tracking-[-0.6px] min-[769px]:[@media(width<=1100px)]:text-[44px] [@media(width<550px)]:text-[45px] min-[550px]:[@media(width<=768px)]:text-[45px] [@media(width<550px)]:tracking-[-1.3px] min-[550px]:[@media(width<=768px)]:tracking-[-1.3px]"
                        label="UNTUK SETIAP MOMEN"
                    >
                        Untuk setiap
                        <br />
                        <em className="font-serif font-normal">
                            <span className="primary text-primary">momen</span>
                        </em>{' '}
                        yang berarti.
                    </SectionHeading>
                    <p className="gk-category-description pb-[20px] text-[16px] text-muted-foreground [@media(width<550px)]:p-[0] [@media(width<550px)]:text-[13px] min-[550px]:[@media(width<=768px)]:p-[0] min-[550px]:[@media(width<=768px)]:text-[13px]">
                        Dari hari spesial hingga petualangan bersama,
                        <br className="[@media(width<550px)]:hidden min-[550px]:[@media(width<=768px)]:hidden" />
                        GaleriKita hadir untuk semua jenis acara.
                    </p>
                </div>
                <div className="gk-categories mt-[19px] grid grid-cols-[repeat(6,_minmax(0,_1fr))] gap-[12px] [@media(width<550px)]:mt-[22px] [@media(width<550px)]:grid-cols-[repeat(2,_minmax(0,_1fr))] [@media(width<550px)]:gap-[10px] min-[550px]:[@media(width<=768px)]:mt-[22px] min-[550px]:[@media(width<=768px)]:grid-cols-[repeat(3,_minmax(0,_1fr))] min-[550px]:[@media(width<=768px)]:gap-[10px]">
                    {categories.map(([key, title]) => (
                        <EventLink
                            iconClassName="hidden"
                            key={key}
                            className="gk-category relative block h-[208px] min-w-[0] overflow-hidden rounded-[8px] border border-[#444449] bg-[#202023] p-[0] hover:border-primary hover:bg-[#202023] [@media(width<550px)]:h-[170px] min-[769px]:[@media(width<=1100px)]:h-[170px] min-[550px]:[@media(width<=768px)]:h-[170px]"
                        >
                            <Photo
                                src={assets.categories[key]}
                                name={`categories.${key}`}
                            />
                            <span className="absolute inset-x-0 top-auto bottom-0 flex items-center gap-3 bg-[linear-gradient(transparent,_#09090be6)] p-[38px_21px_17px] text-[16px] font-normal text-foreground [@media(width<550px)]:gap-[7px] [@media(width<550px)]:p-[30px_13px_13px] [@media(width<550px)]:text-[13px] min-[769px]:[@media(width<=1100px)]:gap-[5px] min-[769px]:[@media(width<=1100px)]:px-[10px] min-[769px]:[@media(width<=1100px)]:text-[11px] min-[550px]:[@media(width<=768px)]:gap-[7px] min-[550px]:[@media(width<=768px)]:p-[30px_13px_13px] min-[550px]:[@media(width<=768px)]:text-[13px] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[5px] [@media(width>1100px)]:[@media(width<=1300px)]:px-[13px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[13px]">
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
            className="gk-closing gk-section relative grid min-h-[318px] scroll-mt-[24px] place-items-center overflow-hidden border-b border-b-[#ffffff0b] [@media(width<550px)]:min-h-[330px] min-[550px]:[@media(width<=768px)]:min-h-[330px]"
        >
            <div
                className="gk-closing-photos absolute inset-[0] after:absolute after:inset-[0] after:z-[1] after:bg-[image:linear-gradient(_90deg,_#09090b20,_#09090bf5_38%,_#09090bf5_62%,_#09090b20_),_linear-gradient(#09090b50,_transparent_60%,_#09090b40)] after:content-[''] [@media(width<550px)]:after:bg-[linear-gradient(_90deg,_#09090b20,_#09090bbb_30%,_#09090bbb_70%,_#09090b20_)] min-[550px]:[@media(width<=768px)]:after:bg-[linear-gradient(_90deg,_#09090b20,_#09090bbb_30%,_#09090bbb_70%,_#09090b20_)]"
                aria-hidden="true"
            >
                {Object.entries(assets.closing).map(([key, src]) => (
                    <Print
                        key={key}
                        src={src}
                        name={`closing.${key}`}
                        className={cn(
                            `gk-closing-${key}`,
                            'absolute h-[213px] w-[264px] pb-[15px] opacity-[0.32] nth-[1]:top-[51px] nth-[1]:left-[-43px] nth-[1]:transform-[rotate(-20deg)] nth-[2]:top-[-71px] nth-[2]:left-[199px] nth-[2]:transform-[rotate(9deg)] nth-[3]:top-[124px] nth-[3]:left-[121px] nth-[3]:transform-[rotate(-11deg)] nth-[4]:top-[35px] nth-[4]:left-[349px] nth-[4]:transform-[rotate(-6deg)] nth-[5]:top-[-51px] nth-[5]:right-[-8px] nth-[5]:transform-[rotate(18deg)] nth-[6]:top-[-11px] nth-[6]:right-[165px] nth-[6]:transform-[rotate(6deg)] nth-[7]:top-[124px] nth-[7]:right-[40px] nth-[7]:transform-[rotate(12deg)] nth-[8]:top-[127px] nth-[8]:right-[342px] nth-[8]:transform-[rotate(-14deg)] [@media(width<550px)]:h-[145px] [@media(width<550px)]:w-[155px] [@media(width<550px)]:opacity-[0.2] [@media(width<550px)]:nth-[1]:left-[-75px] [@media(width<550px)]:nth-[2]:left-[70px] [@media(width<550px)]:nth-[3]:top-[220px] [@media(width<550px)]:nth-[3]:left-[-50px] [@media(width<550px)]:nth-[4]:left-[28px] [@media(width<550px)]:nth-[5]:right-[-50px] [@media(width<550px)]:nth-[6]:right-[50px] [@media(width<550px)]:nth-[7]:top-[210px] [@media(width<550px)]:nth-[7]:right-[-70px] [@media(width<550px)]:nth-[8]:top-[260px] [@media(width<550px)]:nth-[8]:right-[40px] min-[550px]:[@media(width<=768px)]:h-[145px] min-[550px]:[@media(width<=768px)]:w-[155px] min-[550px]:[@media(width<=768px)]:opacity-[0.2] min-[550px]:[@media(width<=768px)]:nth-[1]:left-[-75px] min-[550px]:[@media(width<=768px)]:nth-[2]:left-[70px] min-[550px]:[@media(width<=768px)]:nth-[3]:top-[220px] min-[550px]:[@media(width<=768px)]:nth-[3]:left-[-50px] min-[550px]:[@media(width<=768px)]:nth-[4]:left-[28px] min-[550px]:[@media(width<=768px)]:nth-[5]:right-[-50px] min-[550px]:[@media(width<=768px)]:nth-[6]:right-[50px] min-[550px]:[@media(width<=768px)]:nth-[7]:top-[210px] min-[550px]:[@media(width<=768px)]:nth-[7]:right-[-70px] min-[550px]:[@media(width<=768px)]:nth-[8]:top-[260px] min-[550px]:[@media(width<=768px)]:nth-[8]:right-[40px]',
                        )}
                    />
                ))}
            </div>
            <div className="gk-closing-content relative z-[2] p-[35px_20px] text-center">
                <h2 className="m-[0] font-serif text-[73px] leading-[0.9] font-normal tracking-[-2px] [@media(width<550px)]:text-[51px] [@media(width<550px)]:tracking-[-1.3px] min-[769px]:[@media(width<=1100px)]:text-[56px] min-[550px]:[@media(width<=768px)]:text-[51px] min-[550px]:[@media(width<=768px)]:tracking-[-1.3px]">
                    Momen berlalu.
                    <br />
                    <em className="font-serif font-normal text-primary">
                        Cerita tetap bersama.
                    </em>
                </h2>
                <p className="m-[18px_0_20px] text-[16px] [@media(width<550px)]:m-[20px_auto] [@media(width<550px)]:max-w-[360px] [@media(width<550px)]:text-[13px] min-[550px]:[@media(width<=768px)]:m-[20px_auto] min-[550px]:[@media(width<=768px)]:max-w-[360px] min-[550px]:[@media(width<=768px)]:text-[13px]">
                    Mulai kumpulkan setiap sudut pandang dalam satu galeri
                    bersama GaleriKita.
                </p>
                <EventLink className="min-h-[48px] px-[35px]" />
            </div>
        </section>
    );
}
