"use client";
import { Plus } from 'lucide-react'

import Logo from '@/components/custom/Logo'
import { Button } from '@/components/ui/button'

import { MobileSidebar } from './MobileSidebar'

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { FormPopover } from '../../../../components/forms/form-popover'
import { ThemeToggle } from '../../../../(marketing)/_components/theme-toggle'

const Navbar = () => {
    return (
        <nav className='fixed top-0 h-14 w-full px-4 bg-[var(--landing-bg)]/95 backdrop-blur-md flex items-center border-b border-[var(--landing-line)] z-50'>
            <div className="max-w-7xl mx-auto flex w-full items-center">

                {/* TODO:mobile menu   */}
                <MobileSidebar />

                <div className="flex items-center gap-x-4  w-full">
                    <div className="hidden md:flex">
                        <Logo />
                    </div>
                    <FormPopover  side="bottom" sideOffSet={20} align="start">
                        <Button size={"sm"}
                            className='rounded-sm py-1.5 px-2 h-auto hidden md:block cursor-pointer'
                        >Create</Button>
                    </FormPopover>
                    <FormPopover align="start" side="bottom" sideOffSet={20}>

                        <Button size={"sm"}
                            className='rounded-sm py-1.5 px-2 h-auto md:hidden'
                        ><Plus className='h-4 w-4' /></Button>
                    </FormPopover>
                </div>
                <div className="ml-auto flex items-center gap-x-2">
                    <ThemeToggle />
                    <OrganizationSwitcher
                        hidePersonal
                        afterCreateOrganizationUrl="/organization/:id"
                        afterSelectOrganizationUrl="/organization/:id"
                        afterLeaveOrganizationUrl="/select-org"
                        appearance={{
                            elements: {
                                rootBox: {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                },
                                organizationSwitcherTrigger: "text-[var(--landing-text)] border border-[var(--landing-line)] rounded-none",
                                organizationSwitcherPopoverCard: "bg-[var(--landing-panel)] border-[var(--landing-line)]",
                            },
                        }}
                    />

                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: {
                                    width: 30,
                                    height: 30
                                }
                            }
                        }}
                    />
                </div>
            </div>

        </nav>
    )
}

export default Navbar
