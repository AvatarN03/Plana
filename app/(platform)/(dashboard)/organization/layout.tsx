"use client";
import Sidebar from "../_component/Sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="pt-20 md:pt-24 px-4 sm:px-6 max-w-7xl 2xl:max-w-[1440px] mx-auto min-h-[calc(100vh-4rem)]">
            <div className="flex gap-x-6 lg:gap-x-8 items-start">
                <aside className="w-64 shrink-0 hidden md:block sticky top-24">
                    {/* sidebar */}
                    <Sidebar />
                </aside>

                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default OrganizationLayout;
