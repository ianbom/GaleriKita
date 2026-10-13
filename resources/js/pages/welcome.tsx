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
        <div className="gk-page overflow-clip font-gk-ui text-[16px] leading-[1.45] text-gk-text [background:radial-gradient(ellipse_at_80%_6%,_#20202255,_transparent_17%),_var(--color-gk-background)] [&_*]:motion-reduce:[animation:none]! [&_*]:motion-reduce:[transition:none]! [&_*::after]:motion-reduce:[animation:none]! [&_*::after]:motion-reduce:[transition:none]! [&_*::before]:motion-reduce:[animation:none]! [&_*::before]:motion-reduce:[transition:none]! [&_:focus-visible]:[outline:2px_solid_var(--color-gk-accent)] [&_:focus-visible]:[outline-offset:5px] [&_a]:no-underline [&_a]:[-webkit-tap-highlight-color:transparent] [&_button]:cursor-pointer [&_button]:[-webkit-tap-highlight-color:transparent] [&_button:disabled]:cursor-default [&_button:disabled]:[opacity:0.35]">
            <Head title="GaleriKita - Satu acara. Sejuta cerita.">
                <meta
                    name="description"
                    content="Abadikan setiap sudut pandang. Kumpulkan foto dari semua orang dalam satu galeri bersama GaleriKita."
                />
            </Head>
            <a
                href="#main-content"
                className="gk-skip-link absolute top-[8px] left-[16px] z-[30] [transform:translateY(-150%)] p-[12px_16px] text-[#09090b] [background:var(--color-gk-accent)] [&:focus]:[transform:none]"
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
