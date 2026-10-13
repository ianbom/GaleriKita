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
        <header className="gk-header relative z-[20] h-[68px] border-b border-b-[#ffffff10] bg-[#09090bbf]">
            <div className="gk-container gk-nav relative mx-[auto] flex h-[100%] w-[min(100%_-_128px,_1312px)] items-center justify-between gap-[30px] [@media(width<550px)]:w-[calc(100%_-_40px)] [@media(width<550px)]:gap-[12px] min-[769px]:[@media(width<=1100px)]:w-[calc(100%_-_80px)] min-[550px]:[@media(width<=768px)]:w-[calc(100%_-_40px)] min-[550px]:[@media(width<=768px)]:gap-[12px] [@media(width>1100px)]:[@media(width<=1300px)]:w-[calc(100%_-_80px)]">
                <Brand />
                <nav
                    className="gk-desktop-nav flex items-center gap-[36px] text-[13px] text-muted-foreground [@media(width<550px)]:hidden min-[769px]:[@media(width<=1100px)]:gap-[20px] min-[550px]:[@media(width<=768px)]:hidden"
                    aria-label="Navigasi utama"
                >
                    {navigation.map(([title, id]) => (
                        <a
                            className="hover:text-primary"
                            key={id}
                            href={`#${id}`}
                        >
                            {title}
                        </a>
                    ))}
                </nav>
                <div className="gk-nav-actions flex items-center gap-[25px] text-[13px] [@media(width<550px)]:gap-[10px] min-[550px]:[@media(width<=768px)]:gap-[10px]">
                    <Link
                        className="[@media(width<550px)]:first:hidden min-[550px]:[@media(width<=768px)]:first:hidden"
                        href={auth.user ? dashboard() : login()}
                    >
                        {auth.user ? 'Dashboard' : 'Masuk'}
                    </Link>
                    <EventLink className="min-h-[38px] p-[9px_18px] text-[13px] [@media(width<550px)]:min-h-[44px] [@media(width<550px)]:p-[8px_12px] [@media(width<550px)]:text-[11px] min-[550px]:[@media(width<=768px)]:min-h-[44px] min-[550px]:[@media(width<=768px)]:p-[8px_12px] min-[550px]:[@media(width<=768px)]:text-[11px]">
                        Buat Event
                    </EventLink>
                    <button
                        ref={toggle}
                        className="gk-menu-toggle hidden h-[44px] w-[44px] cursor-pointer text-foreground disabled:cursor-default disabled:opacity-[0.35] [@media(width<550px)]:inline-flex [@media(width<550px)]:items-center [@media(width<550px)]:justify-center min-[550px]:[@media(width<=768px)]:inline-flex min-[550px]:[@media(width<=768px)]:items-center min-[550px]:[@media(width<=768px)]:justify-center"
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
                    className="gk-mobile-nav absolute top-[68px] right-[0] left-[0] grid border-b border-b-border bg-[#141416] p-[16px_24px]"
                    aria-label="Navigasi mobile"
                >
                    {navigation.map(([title, id]) => (
                        <a
                            className="p-[13px_0]"
                            key={id}
                            href={`#${id}`}
                            onClick={() => setOpened(false)}
                        >
                            {title}
                        </a>
                    ))}
                    <Link
                        className="p-[13px_0]"
                        href={auth.user ? dashboard() : login()}
                    >
                        {auth.user ? 'Dashboard' : 'Masuk'}
                    </Link>
                </nav>
            )}
        </header>
    );
}

export function Footer() {
    return (
        <footer className="gk-footer min-h-[275px] bg-[linear-gradient(#10101266,_#09090b)] pt-[28px] [@media(width<550px)]:p-[28px_0] min-[550px]:[@media(width<=768px)]:p-[28px_0]">
            <div className="gk-container relative mx-[auto] w-[min(100%_-_128px,_1312px)] [@media(width<550px)]:w-[calc(100%_-_40px)] min-[769px]:[@media(width<=1100px)]:w-[calc(100%_-_80px)] min-[550px]:[@media(width<=768px)]:w-[calc(100%_-_40px)] [@media(width>1100px)]:[@media(width<=1300px)]:w-[calc(100%_-_80px)]">
                <div className="gk-footer-top flex justify-between gap-[30px] [@media(width<550px)]:flex-wrap [@media(width<550px)]:gap-[25px] min-[550px]:[@media(width<=768px)]:flex-wrap min-[550px]:[@media(width<=768px)]:gap-[25px]">
                    <div className="[@media(width<550px)]:first:w-[100%] min-[550px]:[@media(width<=768px)]:first:w-[100%]">
                        <Brand />
                        <p className="mt-[12px] text-[12px] leading-[1.6] text-muted-foreground min-[769px]:[@media(width<=1100px)]:text-[10px]">
                            Platform galeri foto bersama untuk setiap momen yang
                            berarti.
                            <br />
                            Lebih dari sekadar foto, ini tentang cerita kita.
                        </p>
                    </div>
                    <div className="gk-footer-links pt-[6px] text-[12px] text-muted-foreground [@media(width<550px)]:w-[100%] [@media(width<550px)]:text-[11px] min-[550px]:[@media(width<=768px)]:w-[100%] min-[550px]:[@media(width<=768px)]:text-[11px]">
                        <nav
                            className="flex gap-[35px] [@media(width<550px)]:flex-wrap [@media(width<550px)]:gap-[16px] min-[769px]:[@media(width<=1100px)]:gap-[18px] min-[550px]:[@media(width<=768px)]:flex-wrap min-[550px]:[@media(width<=768px)]:gap-[16px]"
                            aria-label="Navigasi footer"
                        >
                            {navigation.map(([title, id]) => (
                                <a
                                    className="hover:text-primary [@media(width<550px)]:inline-flex [@media(width<550px)]:min-h-[44px] [@media(width<550px)]:items-center min-[550px]:[@media(width<=768px)]:inline-flex min-[550px]:[@media(width<=768px)]:min-h-[44px] min-[550px]:[@media(width<=768px)]:items-center"
                                    key={id}
                                    href={`#${id}`}
                                >
                                    {title}
                                </a>
                            ))}
                        </nav>
                        <div className="gk-legal mt-[12px] flex gap-8 [@media(width<550px)]:mt-[3px] [@media(width<550px)]:gap-[20px] min-[550px]:[@media(width<=768px)]:mt-[3px] min-[550px]:[@media(width<=768px)]:gap-[20px]">
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
                <div className="gk-footer-bottom relative flex items-end gap-[30px] pt-[30px] [@media(width<550px)]:grid [@media(width<550px)]:grid-cols-[1fr] [@media(width<550px)]:gap-[24px] [@media(width<550px)]:pt-[36px] min-[550px]:[@media(width<=768px)]:grid min-[550px]:[@media(width<=768px)]:grid-cols-[1fr] min-[550px]:[@media(width<=768px)]:gap-[24px] min-[550px]:[@media(width<=768px)]:pt-[36px]">
                    <p className="gk-handwritten w-[140px] shrink-[0] transform-[rotate(-8deg)] pb-[7px] font-serif text-[26px] leading-[1.25] tracking-[1px] text-[#949498] italic [@media(width<550px)]:text-[24px] min-[550px]:[@media(width<=768px)]:text-[24px]">
                        Setiap foto,
                        <br />
                        punya cerita.
                    </p>
                    <div className="gk-copyright flex-[1] pb-[16px] text-center text-[12px] text-muted-foreground [@media(width<550px)]:row-[3] [@media(width<550px)]:pb-[0] [@media(width<550px)]:text-[10px] min-[550px]:[@media(width<=768px)]:row-[3] min-[550px]:[@media(width<=768px)]:pb-[0] min-[550px]:[@media(width<=768px)]:text-[10px]">
                        <span className="mb-[23px] block h-[1px] bg-[#ffffff0c] [@media(width<550px)]:mb-[20px] min-[550px]:[@media(width<=768px)]:mb-[20px]" />
                        © 2025 GaleriKita. Semua hak dilindungi.
                    </div>
                    <span
                        className="gk-footer-wordmark font-serif text-[145px] leading-[0.95] tracking-[-7px] text-[#3b3b3e] [@media(width<550px)]:row-[1] [@media(width<550px)]:text-right [@media(width<550px)]:text-[clamp(90px,_20vw,_145px)] [@media(width<550px)]:tracking-[-5px] min-[769px]:[@media(width<=1100px)]:text-[100px] min-[550px]:[@media(width<=768px)]:row-[1] min-[550px]:[@media(width<=768px)]:text-right min-[550px]:[@media(width<=768px)]:text-[clamp(90px,_20vw,_145px)] min-[550px]:[@media(width<=768px)]:tracking-[-5px] [@media(width>1100px)]:[@media(width<=1300px)]:text-[125px]"
                        aria-hidden="true"
                    >
                        GaleriKita.
                    </span>
                </div>
            </div>
        </footer>
    );
}
