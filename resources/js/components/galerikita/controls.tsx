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
        <div>
            <span className="mb-3.5 block text-[12px] text-muted-foreground min-[769px]:[@media(width<=1100px)]:text-[10px] [@media(width<=768px)]:text-[10px]">
                {label}
            </span>
            <div className="grid h-15 grid-cols-[44px_1fr_44px] overflow-hidden rounded-[9px] border border-[#3b3b40] bg-[#222225] [@media(1100px<width<=1300px)]:grid-cols-[36px_1fr_36px] min-[769px]:[@media(width<=1100px)]:grid-cols-[30px_1fr_30px] [@media(width<=768px)]:h-12 [@media(width<=768px)]:grid-cols-[44px_1fr_44px]">
                <button
                    className="flex cursor-pointer items-center justify-center bg-[#ffffff02] hover:enabled:bg-[#ffffff0c] disabled:cursor-default disabled:opacity-35"
                    type="button"
                    aria-label={`Kurangi ${label.toLowerCase()}`}
                    disabled={value <= 1}
                    onClick={() => onChange(Math.max(1, value - 1))}
                >
                    <Minus size={16} />
                </button>
                <output
                    className="flex min-w-0 items-center justify-center border-x border-x-[#3b3b40] px-1 text-[19px] font-semibold wrap-anywhere [@media(width<=768px)]:text-[16px]"
                    aria-label={label}
                >
                    {value}
                </output>
                <button
                    className="flex cursor-pointer items-center justify-center bg-[#ffffff02] hover:enabled:bg-[#ffffff0c] disabled:cursor-default disabled:opacity-35"
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
            className="relative min-h-53.5 scroll-mt-6 border-b border-b-[#ffffff0b] pt-5.5 pb-4.5 [@media(width<=768px)]:py-8"
        >
            <div className="relative mx-auto grid w-[min(100%_-_128px,_1312px)] grid-cols-[0.78fr_1fr] items-center gap-10.75 [@media(1100px<width<=1300px)]:grid-cols-[0.8fr_1fr] min-[769px]:[@media(width<=1100px)]:grid-cols-[0.72fr_1fr] min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_80px)] min-[769px]:[@media(width<=1300px)]:gap-6.25 [@media(width<=768px)]:w-[calc(100%_-_40px)] [@media(width<=768px)]:grid-cols-1 [@media(width<=768px)]:gap-6.25">
                <SectionHeading
                    descriptionClassName="mt-3 min-[769px]:[@media(width<=1100px)]:text-[15px]"
                    headingClassName="text-[58px] leading-[0.86] [@media(1100px<width<=1300px)]:text-[40px] min-[769px]:[@media(width<=1100px)]:text-[33px] [@media(width<=768px)]:text-[40px]"
                    label="HARGA"
                    description="Harga menyesuaikan kapasitas."
                >
                    Setiap acara berbeda.
                    <br />
                    Sesuaikan kebutuhanmu.
                </SectionHeading>
                <div className="grid grid-cols-3 gap-7.5 rounded-[10px] border border-border bg-[linear-gradient(130deg,_#18181a,_#101012)] px-6.5 pt-6.75 pb-4.75 [@media(1100px<width<=1300px)]:gap-3.75 [@media(1100px<width<=1300px)]:px-4.5 min-[769px]:[@media(width<=1100px)]:gap-2.5 min-[769px]:[@media(width<=1100px)]:px-3 min-[769px]:[@media(width<=1100px)]:py-5 [@media(width<=768px)]:grid-cols-2 [@media(width<=768px)]:gap-x-3.75 [@media(width<=768px)]:gap-y-5.5 [@media(width<=768px)]:px-4.25 [@media(width<=768px)]:py-5">
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
                    <div className="border-l border-l-[#29292d] pl-5 min-[769px]:[@media(width<=1300px)]:pl-3 [@media(width<=768px)]:relative [@media(width<=768px)]:col-span-2 [@media(width<=768px)]:border-t [@media(width<=768px)]:border-l-0 [@media(width<=768px)]:border-t-border [@media(width<=768px)]:p-0 [@media(width<=768px)]:pt-4">
                        <span className="mb-0 block text-[12px] text-muted-foreground min-[769px]:[@media(width<=1100px)]:text-[10px]">
                            Estimasi Kapasitas
                        </span>
                        <output
                            className="mb-3.25 block text-[23px] font-semibold whitespace-nowrap min-[769px]:[@media(width<=1300px)]:text-[20px] [@media(width<=768px)]:mb-0"
                            data-capacity
                            aria-live="polite"
                        >
                            {(photographers * photos).toLocaleString('en-US')}{' '}
                            foto
                        </output>
                        <EventLink className="min-h-10.5 w-full rounded-[7px] px-3.75 py-2 min-[769px]:[@media(width<=1100px)]:px-2 min-[769px]:[@media(width<=1100px)]:text-[12px] [@media(width<=768px)]:absolute [@media(width<=768px)]:right-0 [@media(width<=768px)]:bottom-0 [@media(width<=768px)]:min-h-11 [@media(width<=768px)]:w-auto">
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
            className="relative min-h-57.5 scroll-mt-6 border-b border-b-[#ffffff0b] py-5.5 [@media(width<=768px)]:py-8.25"
        >
            <div className="relative mx-auto grid w-[min(100%_-_128px,_1312px)] grid-cols-[0.88fr_1fr] gap-19 min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_80px)] [@media(width<=768px)]:w-[calc(100%_-_40px)] [@media(width<=768px)]:grid-cols-1 [@media(width<=768px)]:gap-7.5">
                <SectionHeading
                    headingClassName="text-[58px] leading-[0.88] [@media(width<=768px)]:text-[47px]"
                    label="FAQ"
                >
                    Pertanyaan yang
                    <br />
                    {'sering '}
                    <em className="font-serif font-normal">ditanyakan.</em>
                </SectionHeading>
                <div className="-mt-1.75">
                    {questions.map(([question, answer], index) => (
                        <div
                            key={question}
                            className="border-b border-b-border"
                        >
                            <h3>
                                <button
                                    className="flex w-full cursor-pointer items-center justify-between gap-4.5 px-0 py-2.25 text-left text-[14px] text-muted-foreground hover:text-foreground disabled:cursor-default disabled:opacity-35 [@media(width<=768px)]:min-h-12 [@media(width<=768px)]:py-3.25 [@media(width<=768px)]:text-[12px]"
                                    id={`faq-question-${index}`}
                                    type="button"
                                    aria-expanded={opened === index}
                                    aria-controls={`faq-answer-${index}`}
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
                                            className="shrink-0"
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            </h3>
                            <div
                                id={`faq-answer-${index}`}
                                role="region"
                                aria-labelledby={`faq-question-${index}`}
                                hidden={opened !== index}
                            >
                                <p className="pt-0 pr-6 pb-4.25 pl-0 text-[14px] leading-[1.6] text-muted-foreground [@media(width<=768px)]:text-[13px]">
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
