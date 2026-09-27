import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "../../components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {

    return (

        // <ClerkProvider >
            <QueryProvider>

                <div>
                    <Toaster />
                    <ModalProvider />
                    {children}
                </div>
            </QueryProvider>
        // </ClerkProvider>
    )
}

export default PlatformLayout;