import { Link, usePage } from '@inertiajs/react';
import { Instagram, Menu, Music2, X, Youtube } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { dashboard, login } from '@/routes';
import { Brand, EventLink } from './primitives';

const navigation = [
    ['Beranda', 'beranda'],
    ['Cara Kerja', 'cara-kerja'],
    ['Fitur', 'fitur'],
    ['Harga', 'harga'],
    ['FAQ', 'faq'],
] as const;

export function Navbar() {
    const [opened, setOpened] = useState(false);
    const toggle = useRef<HTMLButtonElement>(null);
    const menu = useRef<HTMLElement>(null);
    const { auth } = usePage().props;
    useEffect(() => {
        if (!opened) return;
        menu.current?.querySelector('a')?.focus();
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpened(false);
                toggle.current?.focus();
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [opened]);
    return (
        <header className="gk-header relative z-[20] h-[68px] [background:#09090bbf] [border-bottom:1px_solid_#ffffff10]">
            <div className="gk-container gk-nav relative mx-[auto] flex h-[100%] w-[min(100%_-_128px,_1312px)] items-center justify-between gap-[30px] gk-compact:w-[calc(100%_-_80px)] gk-mobile:w-[calc(100%_-_40px)] gk-mobile:gap-[12px]">
                <Brand />
                <nav
                    className="gk-desktop-nav flex items-center gap-[36px] text-[13px] text-gk-secondary gk-small:gap-[20px] gk-mobile:hidden [&_a:hover]:text-gk-accent"
                    aria-label="Navigasi utama"
                >
                    {navigation.map(([title, id]) => (
                        <a key={id} href={`#${id}`}>
                            {title}
                        </a>
                    ))}
                </nav>
                <div className="gk-nav-actions flex items-center gap-[25px] text-[13px] gk-mobile:gap-[10px] [&_.gk-button]:min-h-[38px] [&_.gk-button]:p-[9px_18px] [&_.gk-button]:text-[13px] gk-mobile:[&_.gk-button]:min-h-[44px] gk-mobile:[&_.gk-button]:p-[8px_12px] gk-mobile:[&_.gk-button]:text-[11px] gk-mobile:[&_>_a:first-child]:hidden">
                    <Link href={auth.user ? dashboard() : login()}>
                        {auth.user ? 'Dashboard' : 'Masuk'}
                    </Link>
                    <EventLink>Buat Event</EventLink>
                    <button
                        ref={toggle}
                        className="gk-menu-toggle hidden h-[44px] w-[44px] text-gk-text gk-mobile:inline-flex gk-mobile:items-center gk-mobile:[justify-content:center]"
                        type="button"
                        aria-label={opened ? 'Tutup navigasi' : 'Buka navigasi'}
                        aria-expanded={opened}
                        aria-controls="mobile-navigation"
                        onClick={() => setOpened(!opened)}
                    >
                        {opened ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            {opened && (
                <nav
                    ref={menu}
                    id="mobile-navigation"
                    className="gk-mobile-nav absolute top-[68px] right-[0] left-[0] grid p-[16px_24px] [background:#141416] [border-bottom:1px_solid_var(--color-gk-border)] [&_a]:p-[13px_0]"
                    aria-label="Navigasi mobile"
                >
                    {navigation.map(([title, id]) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            onClick={() => setOpened(false)}
                        >
                            {title}
                        </a>
                    ))}
                    <Link href={auth.user ? dashboard() : login()}>
                        {auth.user ? 'Dashboard' : 'Masuk'}
                    </Link>
                </nav>
            )}
        </header>
    );
}

export function Footer() {
    return (
        <footer className="gk-footer min-h-[275px] pt-[28px] [background:linear-gradient(#10101266,_#09090b)] gk-mobile:p-[28px_0]">
            <div className="gk-container relative mx-[auto] w-[min(100%_-_128px,_1312px)] gk-compact:w-[calc(100%_-_80px)] gk-mobile:w-[calc(100%_-_40px)]">
                <div className="gk-footer-top flex justify-between gap-[30px] gk-mobile:flex-wrap gk-mobile:gap-[25px] gk-mobile:[&_>_div:first-child]:w-[100%] [&_p]:mt-[12px] [&_p]:text-[12px] [&_p]:leading-[1.6] [&_p]:text-gk-secondary gk-small:[&_p]:text-[10px]">
                    <div>
                        <Brand />
                        <p>
                            Platform galeri foto bersama untuk setiap momen yang
                            berarti.
                            <br />
                            Lebih dari sekadar foto, ini tentang cerita kita.
                        </p>
                    </div>
                    <div className="gk-footer-links pt-[6px] text-[12px] text-gk-secondary gk-mobile:w-[100%] gk-mobile:text-[11px] gk-mobile:[&_a]:inline-flex gk-mobile:[&_a]:min-h-[44px] gk-mobile:[&_a]:items-center [&_a:hover]:text-gk-accent [&_nav]:flex [&_nav]:gap-[35px] gk-small:[&_nav]:gap-[18px] gk-mobile:[&_nav]:flex-wrap gk-mobile:[&_nav]:gap-[16px]">
                        <nav aria-label="Navigasi footer">
                            {navigation.map(([title, id]) => (
                                <a key={id} href={`#${id}`}>
                                    {title}
                                </a>
                            ))}
                        </nav>
                        <div className="gk-legal mt-[12px] flex gap-8 gk-mobile:mt-[3px] gk-mobile:gap-[20px]">
                            <span
                                aria-disabled="true"
                                title="Halaman belum tersedia"
                            >
                                Kebijakan Privasi
                            </span>
                            <span
                                aria-disabled="true"
                                title="Halaman belum tersedia"
                            >
                                Syarat &amp; Ketentuan
                            </span>
                        </div>
                    </div>
                    <div
                        className="gk-socials flex gap-6 pt-[7px] text-[#c6c6cb]"
                        aria-label="Media sosial belum tersedia"
                    >
                        <span aria-label="Instagram belum tersedia">
                            <Instagram size={19} />
                        </span>
                        <span aria-label="TikTok belum tersedia">
                            <Music2 size={19} />
                        </span>
                        <span aria-label="YouTube belum tersedia">
                            <Youtube size={20} />
                        </span>
                    </div>
                </div>
                <div className="gk-footer-bottom relative flex items-end gap-[30px] pt-[30px] gk-mobile:grid gk-mobile:grid-cols-[1fr] gk-mobile:gap-[24px] gk-mobile:pt-[36px] [&_.gk-handwritten]:w-[140px] [&_.gk-handwritten]:shrink-[0] [&_.gk-handwritten]:pb-[7px] [&_.gk-handwritten]:text-[26px] gk-mobile:[&_.gk-handwritten]:text-[24px]">
                    <p className="gk-handwritten [transform:rotate(-8deg)] font-gk-display text-[27px] leading-[1.25] tracking-[1px] text-[#949498] italic">
                        Setiap foto,
                        <br />
                        punya cerita.
                    </p>
                    <div className="gk-copyright [flex:1] pb-[16px] text-center text-[12px] text-gk-secondary gk-mobile:[grid-row:3] gk-mobile:pb-[0] gk-mobile:text-[10px] [&_>_span]:mb-[23px] [&_>_span]:block [&_>_span]:h-[1px] [&_>_span]:[background:#ffffff0c] gk-mobile:[&_>_span]:mb-[20px]">
                        <span />© 2025 GaleriKita. Semua hak dilindungi.
                    </div>
                    <span
                        className="gk-footer-wordmark font-gk-display text-[145px] leading-[0.95] tracking-[-7px] text-[#3b3b3e] gk-compact:text-[125px] gk-small:text-[100px] gk-mobile:[grid-row:1] gk-mobile:text-right gk-mobile:text-[clamp(90px,_20vw,_145px)] gk-mobile:tracking-[-5px]"
                        aria-hidden="true"
                    >
                        GaleriKita.
                    </span>
                </div>
            </div>
        </footer>
    );
}
