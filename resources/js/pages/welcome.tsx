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
        <div className="gk-page overflow-clip bg-background bg-[image:radial-gradient(ellipse_at_80%_6%,_#20202255,_transparent_17%),_none] font-sans text-[16px] leading-[1.45] text-foreground **:focus-visible:outline-2 **:focus-visible:outline-offset-[5px] **:focus-visible:outline-primary **:focus-visible:outline-solid **:motion-reduce:animate-none! **:motion-reduce:transition-none!">
            <Head title="GaleriKita - Satu acara. Sejuta cerita.">
                <meta
                    name="description"
                    content="Abadikan setiap sudut pandang. Kumpulkan foto dari semua orang dalam satu galeri bersama GaleriKita."
                />
            </Head>
            <a
                href="#main-content"
                className="gk-skip-link absolute top-[8px] left-[16px] z-[30] transform-[translateY(-150%)] bg-primary p-[12px_16px] text-[#09090b] focus:transform-none"
            >
                Lewati navigasi
            </a>
            <Navbar />
            <main id="main-content" tabIndex={-1}>
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
