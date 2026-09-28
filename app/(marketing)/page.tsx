import { HeroSection } from "./_components/hero-section";
import { BoardMockup } from "./_components/board-mockup";
import { FeaturesBento } from "./_components/features-bento";
import { ComparisonSection } from "./_components/comparison-section";
import { CtaBanner } from "./_components/cta-banner";

export const metadata = {
    title: "Plana — Simple Project Management for Fast Execution",
    description: "A focused, high-performance Kanban project and task management workspace for teams and individuals.",
};

const MarketingPage = () => {
    return (
        <div className="space-y-8 sm:space-y-16 pb-8">
            <HeroSection />
            <div className="px-4 sm:px-6">
                <BoardMockup />
            </div>
            <FeaturesBento />
            <ComparisonSection />
            <CtaBanner />
        </div>
    );
};

export default MarketingPage;