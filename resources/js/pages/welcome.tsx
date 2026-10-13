import { Head } from '@inertiajs/react';
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
                className="space-y-12 md:space-y-20"
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
