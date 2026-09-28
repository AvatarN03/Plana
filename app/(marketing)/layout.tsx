import React from "react";
import { Navbar } from "./_components/Navbar";
import { Footer } from "./_components/Footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-neutral-900 selection:bg-blue-100 selection:text-blue-900">
            <Navbar />
            <main className="flex-1 pt-24 pb-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MarketingLayout;