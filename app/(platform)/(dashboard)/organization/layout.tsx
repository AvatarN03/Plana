"use client";

import Sidebar from "../_component/Sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[var(--landing-bg)]">
      {/* Fixed Full-Height Desktop Sidebar matching concept mockup */}
      <div className="hidden md:flex fixed inset-y-0 left-0 w-64 z-50 border-r border-[var(--landing-line)] bg-[var(--landing-bg)]">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="md:pl-64 pt-16 min-h-screen flex flex-col bg-[var(--landing-bg)]">
        <div className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default OrganizationLayout;
