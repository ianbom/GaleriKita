import { Head, Link, usePage } from '@inertiajs/react';
import HostEventWizard from '@/components/galerikita/host-event-wizard';
import { Button } from '@/components/ui/button';
import { getEventEntry } from '@/lib/host-event-wizard';
import { home, login, register } from '@/routes';
import {
    CategoriesSection,
    ClosingSection,
    CommunitySection,
} from '@/components/galerikita/community';
import { FaqSection, PricingSection } from '@/components/galerikita/controls';
import {
    FeaturesSection,
    HeroSection,
    HowItWorksSection,
} from '@/components/galerikita/experience';
import { Footer, Navbar } from '@/components/galerikita/shell';

export default function Welcome() {
    const {
        url,
        props: { auth },
    } = usePage();
    const entry = getEventEntry(url, !!auth.user);

    if (entry === 'wizard') {
        return (
            <>
                <Head title="Buat Event - GaleriKita" />
                <HostEventWizard />
            </>
        );
    }

    if (entry === 'auth') {
        return (
            <main className="flex min-h-svh items-center justify-center bg-background px-5 py-10">
                <Head title="Masuk untuk membuat event" />
                <div className="w-full max-w-sm space-y-6 text-center">
                    <p className="font-serif text-2xl">GaleriKita.</p>
                    <h1 className="font-serif text-4xl">
                        Momenmu dimulai di sini.
                    </h1>
                    <p className="text-sm leading-6 text-muted-foreground">
                        Masuk atau buat akun Host sebelum mengisi detail event.
                    </p>
                    <div className="grid gap-3">
                        <Button asChild className="min-h-12">
                            <Link href={login()}>Masuk</Link>
                        </Button>
                        <Button asChild variant="outline" className="min-h-12">
                            <Link href={register()}>Buat akun</Link>
                        </Button>
                        <Button asChild variant="ghost" className="min-h-12">
                            <Link href={home()}>Kembali ke beranda</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <div
            data-landing
            className="overflow-clip bg-background bg-[image:radial-gradient(ellipse_at_80%_6%,_#20202255,_transparent_17%),_none] font-sans text-base leading-[1.45] text-foreground **:focus-visible:outline-2 **:focus-visible:outline-offset-5 **:focus-visible:outline-primary **:focus-visible:outline-solid **:motion-reduce:animate-none! **:motion-reduce:transition-none!"
        >
            <Head title="GaleriKita - Satu acara. Sejuta cerita.">
                <meta
                    name="description"
                    content="Abadikan setiap sudut pandang. Kumpulkan foto dari semua orang dalam satu galeri bersama GaleriKita."
                />
            </Head>
            <a
                href="#main-content"
                className="absolute top-2 left-4 z-30 transform-[translateY(-150%)] bg-primary px-4 py-3 text-background focus:transform-none"
            >
                Lewati navigasi
            </a>
            <Navbar />
            <main
                id="main-content"
                tabIndex={-1}
                className="space-y-32 pb-24 md:space-y-48 md:pb-32"
            >
                <HeroSection />
                <HowItWorksSection />
                <FeaturesSection />
                <CommunitySection />
                <CategoriesSection />
                <PricingSection />
                <FaqSection />
                <ClosingSection />
            </main>
            <Footer />
        </div>
    );
}
