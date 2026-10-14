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
            className="relative min-h-145 scroll-mt-20 pt-7 pb-3 [@media(width<=768px)]:min-h-0 [@media(width<=768px)]:pt-8.5 [@media(width<=768px)]:pb-6.5"
        >
            <div className="relative mx-auto w-[min(100%_-_40px,_1400px)] min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_32px)] [@media(width<=768px)]:w-[calc(100%_-_40px)]">
                <div className="mb-4 flex items-end justify-between gap-6 px-11 min-[769px]:[@media(width<=1300px)]:px-6 [@media(width<=768px)]:mb-5 [@media(width<=768px)]:flex-col [@media(width<=768px)]:items-start [@media(width<=768px)]:gap-5 [@media(width<=768px)]:px-0">
                    <SectionHeading
                        eyebrowClassName="mb-2!"
                        descriptionClassName="mt-2"
                        headingClassName="text-[60px] leading-[0.84]"
                        label="GALERI BERSAMA"
                        description="Dan setiap sudut pandang menyimpan cerita yang berbeda."
                    >
                        Setiap orang punya
                        <br />
                        <em className="font-serif font-normal">
                            sudut pandangnya.
                        </em>
                    </SectionHeading>
                    <div className="flex items-center gap-14 pb-3 text-[16px] text-muted-foreground min-[769px]:[@media(width<=1300px)]:gap-7 min-[769px]:[@media(width<=1300px)]:text-[14px] [@media(width<=768px)]:w-full [@media(width<=768px)]:justify-between [@media(width<=768px)]:gap-3.75 [@media(width<=768px)]:p-0 [@media(width<=768px)]:text-[13px]">
                        <p>
                            Momen nyata
                            <br className="[@media(width<=768px)]:hidden" />
                            dari pengguna
                            <br className="[@media(width<=768px)]:hidden" />
                            GaleriKita.
                        </p>
                        <DirectionIcons />
                    </div>
                </div>
                <div
                    className="grid h-95 grid-cols-[1.25fr_0.88fr_1.06fr_0.99fr_1.13fr] gap-3 max-[550px]:grid-cols-2 [@media(width<=768px)]:h-auto [@media(width<=768px)]:gap-2.5 min-[550px]:[@media(width<=768px)]:grid-cols-3"
                    aria-label="Contoh komposisi galeri, foto masih placeholder"
                >
                    {galleryColumns.map((column, index) => (
                        <div
                            key={index}
                            className={cn(
                                'grid min-w-0 grid-cols-2 grid-rows-[58%_1fr] gap-2.5 first:block last:block max-[550px]:first:row-span-2 max-[550px]:first:h-147.5 max-[550px]:last:col-[2] [@media(width<=768px)]:h-72.5 [@media(width<=768px)]:gap-1.75 [@media(width<=768px)]:last:h-67.5 min-[550px]:[@media(width<=768px)]:first:row-auto min-[550px]:[@media(width<=768px)]:first:h-72.5 min-[550px]:[@media(width<=768px)]:last:col-[3]',
                                index === 1 && 'grid-rows-[49%_1fr]',
                                index === 2 && 'grid-rows-[70%_1fr]',
                                index === 3 &&
                                    'grid-rows-[54%_1fr] [@media(width<=768px)]:col-[1] [@media(width<=768px)]:h-67.5',
                            )}
                        >
                            {column.map((photo) => (
                                <figure
                                    key={photo.key}
                                    className={cn(
                                        'relative h-full min-h-0 overflow-hidden rounded-[5px]',
                                        photo.user && 'col-span-2',
                                    )}
                                >
                                    <Photo
                                        src={assets.gallery[photo.key]}
                                        name={`gallery.${photo.key}`}
                                    />
                                    {'user' in photo && (
                                        <figcaption className="absolute right-0 bottom-0 left-0 flex items-end justify-between bg-[linear-gradient(transparent,_#050506d9)] p-2.5 pt-7.5 text-[11px] [@media(width<=768px)]:px-2 [@media(width<=768px)]:text-[9px]">
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
            className="relative min-h-95 scroll-mt-20 pt-6 pb-4.25 min-[769px]:[@media(width<=1100px)]:min-h-82.5 [@media(width<=768px)]:min-h-0 [@media(width<=768px)]:py-7.5"
        >
            <div className="relative mx-auto w-[min(100%_-_88px,_1352px)] min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_48px)] [@media(width<=768px)]:w-[calc(100%_-_40px)]">
                <div className="flex items-end justify-between gap-6 px-5 [@media(width<=768px)]:flex-col [@media(width<=768px)]:items-start [@media(width<=768px)]:gap-5 [@media(width<=768px)]:px-0">
                    <SectionHeading
                        eyebrowClassName="mb-2!"
                        headingClassName="text-[58px] leading-[0.82] min-[769px]:[@media(width<=1100px)]:text-[44px] [@media(width<=768px)]:text-[45px]"
                        label="UNTUK SETIAP MOMEN"
                    >
                        Untuk setiap
                        <br />
                        <em className="font-serif font-normal">
                            <span className="primary text-primary">momen</span>
                        </em>{' '}
                        yang berarti.
                    </SectionHeading>
                    <p className="pb-5 text-[16px] text-muted-foreground [@media(width<=768px)]:p-0 [@media(width<=768px)]:text-[13px]">
                        Dari hari spesial hingga petualangan bersama,
                        <br className="[@media(width<=768px)]:hidden" />
                        GaleriKita hadir untuk semua jenis acara.
                    </p>
                </div>
                <div className="mt-4.75 grid grid-cols-6 gap-3 max-[550px]:grid-cols-2 [@media(width<=768px)]:mt-5.5 [@media(width<=768px)]:gap-2.5 min-[550px]:[@media(width<=768px)]:grid-cols-3">
                    {categories.map(([key, title]) => (
                        <EventLink
                            iconClassName="hidden"
                            key={key}
                            className="relative block h-52 min-w-0 overflow-hidden rounded-[8px] border-[#444449] bg-[#202023] p-0 hover:border-primary hover:bg-[#202023] min-[769px]:[@media(width<=1100px)]:h-42.5 [@media(width<=768px)]:h-42.5"
                        >
                            <Photo
                                src={assets.categories[key]}
                                name={`categories.${key}`}
                            />
                            <span className="absolute inset-x-0 top-auto bottom-0 flex items-center gap-3 bg-[linear-gradient(transparent,_#09090be6)] px-5.25 pt-9.5 pb-4.25 text-[16px] font-normal text-foreground [@media(1100px<width<=1300px)]:px-3.25 [@media(1100px<width<=1300px)]:text-[13px] min-[769px]:[@media(width<=1100px)]:px-2.5 min-[769px]:[@media(width<=1100px)]:text-[11px] min-[769px]:[@media(width<=1300px)]:gap-1.25 [@media(width<=768px)]:gap-1.75 [@media(width<=768px)]:p-3.25 [@media(width<=768px)]:pt-7.5 [@media(width<=768px)]:text-[13px]">
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
            className="relative grid min-h-79.5 scroll-mt-20 place-items-center overflow-hidden [@media(width<=768px)]:min-h-82.5"
        >
            <div
                className="absolute inset-0 after:absolute after:inset-0 after:z-1 after:bg-[image:linear-gradient(_90deg,_#09090b20,_#09090bf5_38%,_#09090bf5_62%,_#09090b20_),_linear-gradient(#09090b50,_transparent_60%,_#09090b40)] after:content-[''] [@media(width<=768px)]:after:bg-[linear-gradient(_90deg,_#09090b20,_#09090bbb_30%,_#09090bbb_70%,_#09090b20_)]"
                aria-hidden="true"
            >
                {Object.entries(assets.closing).map(([key, src], index) => (
                    <Print
                        key={key}
                        src={src}
                        name={`closing.${key}`}
                        className={cn(
                            'absolute h-53.25 w-66 pb-3.75 opacity-32 [@media(width<=768px)]:h-36.25 [@media(width<=768px)]:w-38.75 [@media(width<=768px)]:opacity-20',
                            index === 0 &&
                                'top-12.75 -left-10.75 transform-[rotate(-20deg)] [@media(width<=768px)]:-left-18.75',
                            index === 1 &&
                                '-top-17.75 left-49.75 transform-[rotate(9deg)] [@media(width<=768px)]:left-17.5',
                            index === 2 &&
                                'top-31 left-30.25 transform-[rotate(-11deg)] [@media(width<=768px)]:top-55 [@media(width<=768px)]:-left-12.5',
                            index === 3 &&
                                'top-8.75 left-87.25 transform-[rotate(-6deg)] [@media(width<=768px)]:left-7',
                            index === 4 &&
                                '-top-12.75 -right-2 transform-[rotate(18deg)] [@media(width<=768px)]:-right-12.5',
                            index === 5 &&
                                '-top-2.75 right-41.25 transform-[rotate(6deg)] [@media(width<=768px)]:right-12.5',
                            index === 6 &&
                                'top-31 right-10 transform-[rotate(12deg)] [@media(width<=768px)]:top-52.5 [@media(width<=768px)]:-right-17.5',
                            index === 7 &&
                                'top-31.75 right-85.5 transform-[rotate(-14deg)] [@media(width<=768px)]:top-65 [@media(width<=768px)]:right-10',
                        )}
                    />
                ))}
            </div>
            <div className="relative z-2 px-5 py-8.75 text-center">
                <h2 className="m-0 font-serif text-[73px] leading-[0.9] font-normal tracking-[-2px] min-[769px]:[@media(width<=1100px)]:text-[56px] [@media(width<=768px)]:text-[51px] [@media(width<=768px)]:tracking-[-1.3px]">
                    Momen berlalu.
                    <br />
                    <em className="font-serif font-normal text-primary">
                        Cerita tetap bersama.
                    </em>
                </h2>
                <p className="mx-0 mt-4.5 mb-5 text-[16px] [@media(width<=768px)]:mx-auto [@media(width<=768px)]:my-5 [@media(width<=768px)]:max-w-90 [@media(width<=768px)]:text-[13px]">
                    Mulai kumpulkan setiap sudut pandang dalam satu galeri
                    bersama GaleriKita.
                </p>
                <EventLink className="min-h-12 px-8.75" />
            </div>
        </section>
    );
}
