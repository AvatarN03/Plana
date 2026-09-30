import React from "react";
import { Navbar } from "./_components/Navbar";
import { Footer } from "./_components/Footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="landing-shell min-h-screen flex flex-col selection:bg-orange-500/30 selection:text-[var(--landing-text)]">
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MarketingLayout;
