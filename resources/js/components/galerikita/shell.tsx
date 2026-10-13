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
        <header className="gk-header">
            <div className="gk-container gk-nav">
                <Brand />
                <nav className="gk-desktop-nav" aria-label="Navigasi utama">
                    {navigation.map(([title, id]) => (
                        <a key={id} href={`#${id}`}>
                            {title}
                        </a>
                    ))}
                </nav>
                <div className="gk-nav-actions">
                    <Link href={auth.user ? dashboard() : login()}>
                        {auth.user ? 'Dashboard' : 'Masuk'}
                    </Link>
                    <EventLink>Buat Event</EventLink>
                    <button
                        ref={toggle}
                        className="gk-menu-toggle"
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
                    className="gk-mobile-nav"
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
        <footer className="gk-footer">
            <div className="gk-container">
                <div className="gk-footer-top">
                    <div>
                        <Brand />
                        <p>
                            Platform galeri foto bersama untuk setiap momen yang
                            berarti.
                            <br />
                            Lebih dari sekadar foto, ini tentang cerita kita.
                        </p>
                    </div>
                    <div className="gk-footer-links">
                        <nav aria-label="Navigasi footer">
                            {navigation.map(([title, id]) => (
                                <a key={id} href={`#${id}`}>
                                    {title}
                                </a>
                            ))}
                        </nav>
                        <div className="gk-legal">
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
                        className="gk-socials"
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
                <div className="gk-footer-bottom">
                    <p className="gk-handwritten">
                        Setiap foto,
                        <br />
                        punya cerita.
                    </p>
                    <div className="gk-copyright">
                        <span />© 2025 GaleriKita. Semua hak dilindungi.
                    </div>
                    <span className="gk-footer-wordmark" aria-hidden="true">
                        GaleriKita.
                    </span>
                </div>
            </div>
        </footer>
    );
}
