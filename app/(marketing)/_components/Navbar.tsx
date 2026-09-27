
import Logo from "@/components/custom/Logo"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

export const Navbar = async () => {
    const { userId } = await auth();
    console.log(userId)

    return (
        <div className="fixed top-0 w-full h-14 shadow-sm bg-white px-4 flex items-center">
            <div className="md:max-w-screen-2xl gap-1 flex justify-between items-center mx-auto w-full">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex justify-between w-full items-center">
                    {
                        userId ? (
                            <UserButton />
                        ) : (
                            <>
                                <Button size={"sm"} variant={"outline"} asChild>
                                    <Link href="/sign-in">
                                        Login
                                    </Link>
                                </Button>
                                <Button>
                                    <Link href="/sign-up">
                                        Get Plana for free
                                    </Link>
                                </Button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
