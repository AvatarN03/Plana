import React from 'react'
import Navbar from './_component/Navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="h-full bg-[var(--landing-bg)] text-[var(--landing-text)]">
                {children}
            </div>
        </>
    )
}

export default DashboardLayout
