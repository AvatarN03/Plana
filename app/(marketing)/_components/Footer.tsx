import Logo from "@/components/custom/Logo"
import { Button } from "@/components/ui/button"

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full p-4 border-t-2 bg-slate-100 px-4 flex ">
            <div className="md:max-w-screen-2xl flex justify-between items-center mx-auto w-full">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex justify-between w-full items-center">
                    <Button variant={"ghost"}>
                        Privacy Policy
                    </Button>
                    <Button variant={"ghost"}>
                        Terms and Services
                    </Button>
                </div>
            </div>
        </div>
    )
}
