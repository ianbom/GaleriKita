import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { EventLink, SectionHeading } from './primitives';

function Quantity({
    label,
    value,
    maximum,
    onChange,
}: {
    label: string;
    value: number;
    maximum: number;
    onChange: (value: number) => void;
}) {
    return (
        <div className="gk-quantity [&_>_div]:grid [&_>_div]:h-[60px] [&_>_div]:grid-cols-[44px_1fr_44px] [&_>_div]:overflow-hidden [&_>_div]:rounded-[9px] [&_>_div]:[background:#222225] [&_>_div]:[border:1px_solid_#3b3b40] gk-compact:[&_>_div]:grid-cols-[36px_1fr_36px] gk-small:[&_>_div]:grid-cols-[30px_1fr_30px] gk-mobile:[&_>_div]:h-[48px] gk-mobile:[&_>_div]:grid-cols-[44px_1fr_44px] [&_>_span]:mb-[14px] [&_>_span]:block [&_>_span]:text-[12px] [&_>_span]:text-gk-secondary gk-small:[&_>_span]:text-[10px] gk-mobile:[&_>_span]:text-[10px] [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:[background:#ffffff02] [&_button:hover:enabled]:[background:#ffffff0c] [&_output]:flex [&_output]:min-w-[0] [&_output]:items-center [&_output]:justify-center [&_output]:px-[4px] [&_output]:text-[19px] [&_output]:font-semibold [&_output]:[overflow-wrap:anywhere] [&_output]:[border-inline:1px_solid_#3b3b40] gk-mobile:[&_output]:text-[16px]">
            <span>{label}</span>
            <div>
                <button
                    type="button"
                    aria-label={`Kurangi ${label.toLowerCase()}`}
                    disabled={value <= 1}
                    onClick={() => onChange(Math.max(1, value - 1))}
                >
                    <Minus size={16} />
                </button>
                <output aria-label={label}>{value}</output>
                <button
                    type="button"
                    aria-label={`Tambah ${label.toLowerCase()}`}
                    disabled={value >= maximum}
                    onClick={() => onChange(Math.min(maximum, value + 1))}
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );
}

export function PricingSection() {
    const [photographers, setPhotographers] = useState(50);
    const [photos, setPhotos] = useState(100);
    return (
        <section
            id="harga"
            className="gk-pricing gk-section relative min-h-[214px] scroll-mt-[24px] p-[22px_0_18px] [border-bottom:1px_solid_#ffffff0b] gk-mobile:p-[32px_0] [&_.gk-description]:mt-[12px] gk-small:[&_.gk-description]:text-[15px] [&_h2]:m-[0] [&_h2]:font-gk-display [&_h2]:text-[58px] [&_h2]:leading-[0.86] [&_h2]:font-normal [&_h2]:tracking-[-0.6px] gk-compact:[&_h2]:text-[40px] gk-small:[&_h2]:text-[33px] gk-mobile:[&_h2]:text-[40px] gk-mobile:[&_h2]:tracking-[-1.3px]"
        >
            <div className="gk-container gk-pricing-layout relative mx-[auto] grid w-[min(100%_-_128px,_1312px)] grid-cols-[0.78fr_1fr] items-center gap-[43px] gk-compact:w-[calc(100%_-_80px)] gk-compact:grid-cols-[0.8fr_1fr] gk-compact:gap-[25px] gk-small:grid-cols-[0.72fr_1fr] gk-mobile:w-[calc(100%_-_40px)] gk-mobile:grid-cols-[1fr] gk-mobile:gap-[25px]">
                <SectionHeading
                    label="HARGA"
                    description="Harga menyesuaikan kapasitas."
                >
                    Setiap acara berbeda.
                    <br />
                    Sesuaikan kebutuhanmu.
                </SectionHeading>
                <div className="gk-pricing-panel grid grid-cols-[1fr_1fr_1fr] gap-[30px] rounded-[10px] p-[27px_26px_19px] [background:linear-gradient(130deg,_#18181a,_#101012)] [border:1px_solid_var(--color-gk-border)] gk-compact:gap-[15px] gk-compact:px-[18px] gk-small:gap-[10px] gk-small:p-[20px_12px] gk-mobile:grid-cols-[1fr_1fr] gk-mobile:gap-[22px_15px] gk-mobile:p-[20px_17px]">
                    <Quantity
                        label="Jumlah Fotografer"
                        value={photographers}
                        maximum={Math.floor(Number.MAX_SAFE_INTEGER / photos)}
                        onChange={setPhotographers}
                    />
                    <Quantity
                        label="Foto per Fotografer"
                        value={photos}
                        maximum={Math.floor(
                            Number.MAX_SAFE_INTEGER / photographers,
                        )}
                        onChange={setPhotos}
                    />
                    <div className="gk-capacity pl-[20px] [border-left:1px_solid_#29292d] gk-compact:pl-[12px] gk-mobile:relative gk-mobile:[grid-column:span_2] gk-mobile:p-[16px_0_0] gk-mobile:[border-left:0] gk-mobile:[border-top:1px_solid_var(--color-gk-border)] [&_.gk-button]:min-h-[42px] [&_.gk-button]:w-[100%] [&_.gk-button]:rounded-[7px] [&_.gk-button]:p-[8px_15px] gk-small:[&_.gk-button]:px-[8px] gk-small:[&_.gk-button]:text-[12px] gk-mobile:[&_.gk-button]:absolute gk-mobile:[&_.gk-button]:right-[0] gk-mobile:[&_.gk-button]:bottom-[0] gk-mobile:[&_.gk-button]:min-h-[44px] gk-mobile:[&_.gk-button]:w-[auto] [&_>_span]:mb-[0] [&_>_span]:block [&_>_span]:text-[12px] [&_>_span]:text-gk-secondary gk-small:[&_>_span]:text-[10px] [&_output]:mb-[13px] [&_output]:block [&_output]:text-[23px] [&_output]:font-semibold [&_output]:whitespace-nowrap gk-compact:[&_output]:text-[20px] gk-mobile:[&_output]:mb-[0]">
                        <span>Estimasi Kapasitas</span>
                        <output data-capacity aria-live="polite">
                            {(photographers * photos).toLocaleString('en-US')}{' '}
                            foto
                        </output>
                        <EventLink>Lanjutkan</EventLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

const questions = [
    [
        'Apakah peserta harus membuat akun?',
        'Tidak. Peserta cukup scan QR atau buka tautan acara, lalu masukkan nama untuk mulai berbagi foto.',
    ],
    [
        'Berapa lama event berlangsung?',
        'Setiap acara berlangsung selama 24 jam dari waktu mulai yang ditentukan host. Foto dapat diambil atau diunggah selama periode tersebut.',
    ],
    [
        'Apakah foto masih bisa dilihat setelah acara selesai?',
        'Ya. Tautan galeri tetap dapat digunakan setelah acara selesai, sesuai pengaturan akses host. Unggah foto ditutup saat acara berakhir.',
    ],
    [
        'Bisakah saya mengatur privasi galeri?',
        'Host dapat memilih galeri Private atau Public, serta menampilkan foto langsung dengan Instant atau setelah acara melalui After Event.',
    ],
    [
        'Bagaimana cara membagikan event?',
        'Bagikan tautan atau QR code acara kepada peserta. Mereka dapat bergabung melalui browser tanpa membuat akun.',
    ],
] as const;

export function FaqSection() {
    const [opened, setOpened] = useState<number | null>(null);
    return (
        <section
            id="faq"
            className="gk-faq gk-section relative min-h-[230px] scroll-mt-[24px] p-[22px_0] [border-bottom:1px_solid_#ffffff0b] gk-mobile:p-[33px_0] [&_h2]:m-[0] [&_h2]:font-gk-display [&_h2]:text-[58px] [&_h2]:leading-[0.88] [&_h2]:font-normal [&_h2]:tracking-[-0.6px] gk-small:[&_h2]:text-[56px] gk-mobile:[&_h2]:text-[47px] gk-mobile:[&_h2]:tracking-[-1.3px]"
        >
            <div className="gk-container gk-faq-layout relative mx-[auto] grid w-[min(100%_-_128px,_1312px)] grid-cols-[0.88fr_1fr] gap-[76px] gk-compact:w-[calc(100%_-_80px)] gk-mobile:w-[calc(100%_-_40px)] gk-mobile:grid-cols-[1fr] gk-mobile:gap-[30px]">
                <SectionHeading label="FAQ">
                    Pertanyaan yang
                    <br />
                    {'sering '}
                    <em className="font-gk-display font-normal">ditanyakan.</em>
                </SectionHeading>
                <div className="gk-faq-list mt-[-7px]">
                    {questions.map(([question, answer], index) => (
                        <div
                            key={question}
                            className="gk-faq-item [border-bottom:1px_solid_var(--color-gk-border)] [&_[role='region']_p]:p-[0_24px_17px_0] [&_[role='region']_p]:text-[14px] [&_[role='region']_p]:leading-[1.6] [&_[role='region']_p]:text-gk-secondary gk-mobile:[&_[role='region']_p]:text-[13px] [&_button]:flex [&_button]:w-[100%] [&_button]:items-center [&_button]:justify-between [&_button]:gap-[18px] [&_button]:p-[9px_0] [&_button]:text-left [&_button]:text-[14px] [&_button]:text-gk-secondary gk-mobile:[&_button]:min-h-[48px] gk-mobile:[&_button]:py-[13px] gk-mobile:[&_button]:text-[12px] [&_button_svg]:shrink-[0] [&_button:hover]:text-gk-text"
                        >
                            <h3>
                                <button
                                    id={`gk-question-${index}`}
                                    type="button"
                                    aria-expanded={opened === index}
                                    aria-controls={`gk-answer-${index}`}
                                    onClick={() =>
                                        setOpened(
                                            opened === index ? null : index,
                                        )
                                    }
                                >
                                    {question}
                                    {opened === index ? (
                                        <Minus size={16} aria-hidden="true" />
                                    ) : (
                                        <Plus size={16} aria-hidden="true" />
                                    )}
                                </button>
                            </h3>
                            <div
                                id={`gk-answer-${index}`}
                                role="region"
                                aria-labelledby={`gk-question-${index}`}
                                hidden={opened !== index}
                            >
                                <p>{answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
