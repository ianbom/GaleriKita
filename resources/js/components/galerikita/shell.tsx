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
        <header className="sticky top-0 z-20 h-17 border-b border-b-[#ffffff10] bg-[#09090bbf]">
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
        <footer className="bg-muted/30 py-16 lg:py-24">
            <div className="mx-auto w-[min(100%_-_128px,_1312px)] min-[769px]:[@media(width<=1300px)]:w-[calc(100%_-_80px)] [@media(width<=768px)]:w-[calc(100%_-_40px)]">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <Brand />
                    <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                        Platform galeri foto bersama untuk setiap momen yang
                        berarti. Lebih dari sekadar foto, ini tentang cerita
                        kita.
                    </p>
                </div>
                <div className="mt-12 flex flex-col gap-8 lg:mt-20 lg:flex-row lg:items-end lg:justify-between">
                    <span
                        className="block font-serif text-6xl leading-none tracking-tight whitespace-nowrap text-foreground sm:text-8xl lg:text-9xl"
                        aria-hidden="true"
                    >
                        GaleriKita.
                    </span>
                    <p className="font-serif text-3xl leading-tight text-muted-foreground italic lg:pb-2 lg:text-right">
                        Setiap foto,
                        <br />
                        punya cerita.
                    </p>
                </div>
                <p className="mt-10 text-xs leading-6 text-muted-foreground lg:mt-16">
                    © 2025 GaleriKita. Semua hak dilindungi.
                </p>
                <div className="mt-6 flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs leading-6 text-muted-foreground sm:text-sm">
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
                    <div
                        className="flex items-center gap-6 text-muted-foreground"
                        role="group"
                        aria-label="Media sosial belum tersedia"
                    >
                        <span role="img" aria-label="Instagram belum tersedia">
                            <Instagram size={20} aria-hidden="true" />
                        </span>
                        <span role="img" aria-label="TikTok belum tersedia">
                            <Music2 size={20} aria-hidden="true" />
                        </span>
                        <span role="img" aria-label="YouTube belum tersedia">
                            <Youtube size={20} aria-hidden="true" />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
