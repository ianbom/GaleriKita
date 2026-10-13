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
        <div className="gk-quantity">
            <span className="mb-[14px] block text-[12px] text-muted-foreground [@media(width<550px)]:text-[10px] min-[769px]:[@media(width<=1100px)]:text-[10px] min-[550px]:[@media(width<=768px)]:text-[10px]">
                {label}
            </span>
            <div className="grid h-[60px] grid-cols-[44px_1fr_44px] overflow-hidden rounded-[9px] border border-[#3b3b40] bg-[#222225] [@media(width<550px)]:h-[48px] [@media(width<550px)]:grid-cols-[44px_1fr_44px] min-[769px]:[@media(width<=1100px)]:grid-cols-[30px_1fr_30px] min-[550px]:[@media(width<=768px)]:h-[48px] min-[550px]:[@media(width<=768px)]:grid-cols-[44px_1fr_44px] [@media(width>1100px)]:[@media(width<=1300px)]:grid-cols-[36px_1fr_36px]">
                <button
                    className="flex cursor-pointer items-center justify-center bg-[#ffffff02] hover:enabled:bg-[#ffffff0c] disabled:cursor-default disabled:opacity-[0.35]"
                    type="button"
                    aria-label={`Kurangi ${label.toLowerCase()}`}
                    disabled={value <= 1}
                    onClick={() => onChange(Math.max(1, value - 1))}
                >
                    <Minus size={16} />
                </button>
                <output
                    className="flex min-w-[0] items-center justify-center border-x border-x-[#3b3b40] px-[4px] text-[19px] font-semibold wrap-anywhere [@media(width<550px)]:text-[16px] min-[550px]:[@media(width<=768px)]:text-[16px]"
                    aria-label={label}
                >
                    {value}
                </output>
                <button
                    className="flex cursor-pointer items-center justify-center bg-[#ffffff02] hover:enabled:bg-[#ffffff0c] disabled:cursor-default disabled:opacity-[0.35]"
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
            className="gk-pricing gk-section relative min-h-[214px] scroll-mt-[24px] border-b border-b-[#ffffff0b] p-[22px_0_18px] [@media(width<550px)]:p-[32px_0] min-[550px]:[@media(width<=768px)]:p-[32px_0]"
        >
            <div className="gk-container gk-pricing-layout relative mx-[auto] grid w-[min(100%_-_128px,_1312px)] grid-cols-[0.78fr_1fr] items-center gap-[43px] [@media(width<550px)]:w-[calc(100%_-_40px)] [@media(width<550px)]:grid-cols-[1fr] [@media(width<550px)]:gap-[25px] min-[769px]:[@media(width<=1100px)]:w-[calc(100%_-_80px)] min-[769px]:[@media(width<=1100px)]:grid-cols-[0.72fr_1fr] min-[769px]:[@media(width<=1100px)]:gap-[25px] min-[550px]:[@media(width<=768px)]:w-[calc(100%_-_40px)] min-[550px]:[@media(width<=768px)]:grid-cols-[1fr] min-[550px]:[@media(width<=768px)]:gap-[25px] [@media(width>1100px)]:[@media(width<=1300px)]:w-[calc(100%_-_80px)] [@media(width>1100px)]:[@media(width<=1300px)]:grid-cols-[0.8fr_1fr] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[25px]">
                <SectionHeading
                    descriptionClassName="mt-[12px] min-[769px]:[@media(width<=1100px)]:text-[15px]"
                    headingClassName="m-[0] font-serif text-[58px] leading-[0.86] font-normal tracking-[-0.6px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[40px] min-[769px]:[@media(width<=1100px)]:text-[33px] [@media(width<550px)]:text-[40px] min-[550px]:[@media(width<=768px)]:text-[40px] [@media(width<550px)]:tracking-[-1.3px] min-[550px]:[@media(width<=768px)]:tracking-[-1.3px]"
                    label="HARGA"
                    description="Harga menyesuaikan kapasitas."
                >
                    Setiap acara berbeda.
                    <br />
                    Sesuaikan kebutuhanmu.
                </SectionHeading>
                <div className="gk-pricing-panel grid grid-cols-[1fr_1fr_1fr] gap-[30px] rounded-[10px] border border-border bg-[linear-gradient(130deg,_#18181a,_#101012)] p-[27px_26px_19px] [@media(width<550px)]:grid-cols-[1fr_1fr] [@media(width<550px)]:gap-[22px_15px] [@media(width<550px)]:p-[20px_17px] min-[769px]:[@media(width<=1100px)]:gap-[10px] min-[769px]:[@media(width<=1100px)]:p-[20px_12px] min-[550px]:[@media(width<=768px)]:grid-cols-[1fr_1fr] min-[550px]:[@media(width<=768px)]:gap-[22px_15px] min-[550px]:[@media(width<=768px)]:p-[20px_17px] [@media(width>1100px)]:[@media(width<=1300px)]:gap-[15px] [@media(width>1100px)]:[@media(width<=1300px)]:px-[18px]">
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
                    <div className="gk-capacity border-l border-l-[#29292d] pl-[20px] [@media(width<550px)]:relative [@media(width<550px)]:col-[span_2] [@media(width<550px)]:border-t [@media(width<550px)]:border-l-0 [@media(width<550px)]:border-t-border [@media(width<550px)]:p-[16px_0_0] min-[769px]:[@media(width<=1100px)]:pl-[12px] min-[550px]:[@media(width<=768px)]:relative min-[550px]:[@media(width<=768px)]:col-[span_2] min-[550px]:[@media(width<=768px)]:border-t min-[550px]:[@media(width<=768px)]:border-l-0 min-[550px]:[@media(width<=768px)]:border-t-border min-[550px]:[@media(width<=768px)]:p-[16px_0_0] [@media(width>1100px)]:[@media(width<=1300px)]:pl-[12px]">
                        <span className="mb-[0] block text-[12px] text-muted-foreground min-[769px]:[@media(width<=1100px)]:text-[10px]">
                            Estimasi Kapasitas
                        </span>
                        <output
                            className="mb-[13px] block text-[23px] font-semibold whitespace-nowrap [@media(width<550px)]:mb-[0] min-[769px]:[@media(width<=1100px)]:text-[20px] min-[550px]:[@media(width<=768px)]:mb-[0] [@media(width>1100px)]:[@media(width<=1300px)]:text-[20px]"
                            data-capacity
                            aria-live="polite"
                        >
                            {(photographers * photos).toLocaleString('en-US')}{' '}
                            foto
                        </output>
                        <EventLink className="min-h-[42px] w-[100%] rounded-[7px] p-[8px_15px] [@media(width<550px)]:absolute [@media(width<550px)]:right-[0] [@media(width<550px)]:bottom-[0] [@media(width<550px)]:min-h-[44px] [@media(width<550px)]:w-[auto] min-[769px]:[@media(width<=1100px)]:px-[8px] min-[769px]:[@media(width<=1100px)]:text-[12px] min-[550px]:[@media(width<=768px)]:absolute min-[550px]:[@media(width<=768px)]:right-[0] min-[550px]:[@media(width<=768px)]:bottom-[0] min-[550px]:[@media(width<=768px)]:min-h-[44px] min-[550px]:[@media(width<=768px)]:w-[auto]">
                            Lanjutkan
                        </EventLink>
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
            className="gk-faq gk-section relative min-h-[230px] scroll-mt-[24px] border-b border-b-[#ffffff0b] p-[22px_0] [@media(width<550px)]:p-[33px_0] min-[550px]:[@media(width<=768px)]:p-[33px_0]"
        >
            <div className="gk-container gk-faq-layout relative mx-[auto] grid w-[min(100%_-_128px,_1312px)] grid-cols-[0.88fr_1fr] gap-[76px] [@media(width<550px)]:w-[calc(100%_-_40px)] [@media(width<550px)]:grid-cols-[1fr] [@media(width<550px)]:gap-[30px] min-[769px]:[@media(width<=1100px)]:w-[calc(100%_-_80px)] min-[550px]:[@media(width<=768px)]:w-[calc(100%_-_40px)] min-[550px]:[@media(width<=768px)]:grid-cols-[1fr] min-[550px]:[@media(width<=768px)]:gap-[30px] [@media(width>1100px)]:[@media(width<=1300px)]:w-[calc(100%_-_80px)]">
                <SectionHeading
                    headingClassName="m-[0] font-serif text-[58px] leading-[0.88] font-normal tracking-[-0.6px] min-[769px]:[@media(width<=1100px)]:text-[56px] [@media(width<550px)]:text-[47px] min-[550px]:[@media(width<=768px)]:text-[47px] [@media(width<550px)]:tracking-[-1.3px] min-[550px]:[@media(width<=768px)]:tracking-[-1.3px]"
                    label="FAQ"
                >
                    Pertanyaan yang
                    <br />
                    {'sering '}
                    <em className="font-serif font-normal">ditanyakan.</em>
                </SectionHeading>
                <div className="gk-faq-list mt-[-7px]">
                    {questions.map(([question, answer], index) => (
                        <div
                            key={question}
                            className="gk-faq-item border-b border-b-border"
                        >
                            <h3>
                                <button
                                    className="flex w-[100%] cursor-pointer items-center justify-between gap-[18px] p-[9px_0] text-left text-[14px] text-muted-foreground hover:text-foreground disabled:cursor-default disabled:opacity-[0.35] [@media(width<550px)]:min-h-[48px] [@media(width<550px)]:py-[13px] [@media(width<550px)]:text-[12px] min-[550px]:[@media(width<=768px)]:min-h-[48px] min-[550px]:[@media(width<=768px)]:py-[13px] min-[550px]:[@media(width<=768px)]:text-[12px]"
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
                                        <Plus
                                            className="shrink-[0]"
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            </h3>
                            <div
                                id={`gk-answer-${index}`}
                                role="region"
                                aria-labelledby={`gk-question-${index}`}
                                hidden={opened !== index}
                            >
                                <p className="p-[0_24px_17px_0] text-[14px] leading-[1.6] text-muted-foreground [@media(width<550px)]:text-[13px] min-[550px]:[@media(width<=768px)]:text-[13px]">
                                    {answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
