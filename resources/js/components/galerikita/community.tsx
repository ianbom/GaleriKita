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
        <section id="galeri" className="gk-community gk-section">
            <div className="gk-container gk-container-gallery">
                <div className="gk-heading-row gk-inset-heading">
                    <SectionHeading
                        label="GALERI BERSAMA"
                        description="Dan setiap sudut pandang menyimpan cerita yang berbeda."
                    >
                        Setiap orang punya
                        <br />
                        <em>sudut pandangnya.</em>
                    </SectionHeading>
                    <div className="gk-heading-aside">
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
                    className="gk-masonry"
                    aria-label="Contoh komposisi galeri, foto masih placeholder"
                >
                    {galleryColumns.map((column, index) => (
                        <div
                            key={index}
                            className={`gk-gallery-column gk-gallery-column-${index + 1}`}
                        >
                            {column.map((photo) => (
                                <figure
                                    key={photo.key}
                                    className={`gk-gallery-photo ${photo.user ? 'gk-gallery-main-photo' : ''}`}
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
        <section id="momen" className="gk-moments gk-section">
            <div className="gk-container gk-container-wide">
                <div className="gk-heading-row gk-inset-heading">
                    <SectionHeading label="UNTUK SETIAP MOMEN">
                        Untuk setiap
                        <br />
                        <em>
                            <span className="gk-accent">momen</span>
                        </em>{' '}
                        yang berarti.
                    </SectionHeading>
                    <p className="gk-category-description">
                        Dari hari spesial hingga petualangan bersama,
                        <br />
                        GaleriKita hadir untuk semua jenis acara.
                    </p>
                </div>
                <div className="gk-categories">
                    {categories.map(([key, title]) => (
                        <EventLink key={key} className="gk-category">
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
        <section id="mulai" className="gk-closing gk-section">
            <div className="gk-closing-photos" aria-hidden="true">
                {Object.entries(assets.closing).map(([key, src]) => (
                    <Print
                        key={key}
                        src={src}
                        name={`closing.${key}`}
                        className={`gk-closing-${key}`}
                    />
                ))}
            </div>
            <div className="gk-closing-content">
                <h2>
                    Momen berlalu.
                    <br />
                    <em>Cerita tetap bersama.</em>
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
