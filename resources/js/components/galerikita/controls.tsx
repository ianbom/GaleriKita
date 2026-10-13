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
        <section id="harga" className="gk-pricing gk-section">
            <div className="gk-container gk-pricing-layout">
                <SectionHeading
                    label="HARGA"
                    description="Harga menyesuaikan kapasitas."
                >
                    Setiap acara berbeda.
                    <br />
                    Sesuaikan kebutuhanmu.
                </SectionHeading>
                <div className="gk-pricing-panel">
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
                    <div className="gk-capacity">
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
        <section id="faq" className="gk-faq gk-section">
            <div className="gk-container gk-faq-layout">
                <SectionHeading label="FAQ">
                    Pertanyaan yang
                    <br />
                    sering <em>ditanyakan.</em>
                </SectionHeading>
                <div className="gk-faq-list">
                    {questions.map(([question, answer], index) => (
                        <div key={question} className="gk-faq-item">
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
