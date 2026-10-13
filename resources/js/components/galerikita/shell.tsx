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
        <header className="relative z-20 h-17 border-b border-b-[#ffffff10] bg-[#09090bbf]">
            <div className="relative mx-auto flex h-full w-[min(100%_-_128px,_1312px)] items-center justify-between gap-7.5 min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_80px)] [@media(width<=768px)]:w-[calc(100%_-_40px)] [@media(width<=768px)]:gap-3">
                <Brand />
                <nav
                    className="flex items-center gap-9 text-[13px] text-muted-foreground min-[769px]:[@media(width<=1100px)]:gap-5 [@media(width<=768px)]:hidden"
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
                <div className="flex items-center gap-6.25 text-[13px] [@media(width<=768px)]:gap-2.5">
                    <Link
                        className="[@media(width<=768px)]:first:hidden"
                        href={auth.user ? dashboard() : login()}
                    >
                        {auth.user ? 'Dashboard' : 'Masuk'}
                    </Link>
                    <EventLink className="min-h-9.5 px-4.5 py-2.25 text-[13px] [@media(width<=768px)]:min-h-11 [@media(width<=768px)]:px-3 [@media(width<=768px)]:py-2 [@media(width<=768px)]:text-[11px]">
                        Buat Event
                    </EventLink>
                    <button
                        ref={toggle}
                        className="hidden h-11 w-11 cursor-pointer text-foreground disabled:cursor-default disabled:opacity-35 [@media(width<=768px)]:inline-flex [@media(width<=768px)]:items-center [@media(width<=768px)]:justify-center"
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
                    className="absolute top-17 right-0 left-0 grid border-b border-b-border bg-[#141416] px-6 py-4"
                    aria-label="Navigasi mobile"
                >
                    {navigation.map(([title, id]) => (
                        <a
                            className="px-0 py-3.25"
                            key={id}
                            href={`#${id}`}
                            onClick={() => setOpened(false)}
                        >
                            {title}
                        </a>
                    ))}
                    <Link
                        className="px-0 py-3.25"
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
        <footer className="min-h-68.75 bg-[linear-gradient(#10101266,_#09090b)] pt-7 [@media(width<=768px)]:px-0 [@media(width<=768px)]:py-7">
            <div className="relative mx-auto w-[min(100%_-_128px,_1312px)] min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_80px)] [@media(width<=768px)]:w-[calc(100%_-_40px)]">
                <div className="flex justify-between gap-7.5 [@media(width<=768px)]:flex-wrap [@media(width<=768px)]:gap-6.25">
                    <div className="[@media(width<=768px)]:first:w-full">
                        <Brand />
                        <p className="mt-3 text-[12px] leading-[1.6] text-muted-foreground min-[769px]:[@media(width<=1100px)]:text-[10px]">
                            Platform galeri foto bersama untuk setiap momen yang
                            berarti.
                            <br />
                            Lebih dari sekadar foto, ini tentang cerita kita.
                        </p>
                    </div>
                    <div className="pt-1.5 text-[12px] text-muted-foreground [@media(width<=768px)]:w-full [@media(width<=768px)]:text-[11px]">
                        <nav
                            className="flex gap-8.75 min-[769px]:[@media(width<=1100px)]:gap-4.5 [@media(width<=768px)]:flex-wrap [@media(width<=768px)]:gap-4"
                            aria-label="Navigasi footer"
                        >
                            {navigation.map(([title, id]) => (
                                <a
                                    className="hover:text-primary [@media(width<=768px)]:inline-flex [@media(width<=768px)]:min-h-11 [@media(width<=768px)]:items-center"
                                    key={id}
                                    href={`#${id}`}
                                >
                                    {title}
                                </a>
                            ))}
                        </nav>
                        <div className="mt-3 flex gap-8 [@media(width<=768px)]:mt-0.75 [@media(width<=768px)]:gap-5">
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
                        className="flex gap-6 pt-1.75 text-[#c6c6cb]"
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
                <div className="relative flex items-end gap-7.5 pt-7.5 [@media(width<=768px)]:grid [@media(width<=768px)]:grid-cols-1 [@media(width<=768px)]:gap-6 [@media(width<=768px)]:pt-9">
                    <p className="w-35 shrink-0 transform-[rotate(-8deg)] pb-1.75 font-serif text-[26px] leading-tight tracking-[1px] text-[#949498] italic [@media(width<=768px)]:text-[24px]">
                        Setiap foto,
                        <br />
                        punya cerita.
                    </p>
                    <div className="flex-[1] pb-4 text-center text-[12px] text-muted-foreground [@media(width<=768px)]:row-[3] [@media(width<=768px)]:pb-0 [@media(width<=768px)]:text-[10px]">
                        <span className="mb-5.75 block h-px bg-[#ffffff0c] [@media(width<=768px)]:mb-5" />
                        © 2025 GaleriKita. Semua hak dilindungi.
                    </div>
                    <span
                        className="font-serif text-[145px] leading-[0.95] tracking-[-7px] text-[#3b3b3e] [@media(1100px<width<=1300px)]:text-[125px] min-[769px]:[@media(width<=1100px)]:text-[100px] [@media(width<=768px)]:row-[1] [@media(width<=768px)]:text-right [@media(width<=768px)]:text-[clamp(90px,_20vw,_145px)] [@media(width<=768px)]:tracking-[-5px]"
                        aria-hidden="true"
                    >
                        GaleriKita.
                    </span>
                </div>
            </div>
        </footer>
    );
}
