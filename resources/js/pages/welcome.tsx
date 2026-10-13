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
import '../../css/galerikita.css';

export default function Welcome() {
    return (
        <div className="gk-page">
            <Head title="GaleriKita - Satu acara. Sejuta cerita.">
                <meta
                    name="description"
                    content="Abadikan setiap sudut pandang. Kumpulkan foto dari semua orang dalam satu galeri bersama GaleriKita."
                />
            </Head>
            <a href="#main-content" className="gk-skip-link">
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
