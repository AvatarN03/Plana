import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "../../components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryProvider>
            <div className="landing-shell min-h-screen bg-[var(--landing-bg)] text-[var(--landing-text)]">
                <Toaster />
                <ModalProvider />
                {children}
            </div>
        </QueryProvider>
    )
}

export default PlatformLayout;
