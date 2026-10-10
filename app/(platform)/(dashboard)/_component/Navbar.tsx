"use client";

import { Plus, Search } from "lucide-react";
import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./MobileSidebar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { FormPopover } from "@/components/forms/form-popover";
import { ThemeToggle } from "@/app/(marketing)/_components/theme-toggle";

const Navbar = () => {
  return (
    <nav className="fixed top-0 h-16 w-full px-4 sm:px-6 bg-[var(--landing-bg)]/95 backdrop-blur-md flex items-center border-b border-[var(--landing-line)] z-50 transition-colors duration-200">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto flex w-full items-center justify-between gap-x-4">
        {/* Left Section: Mobile toggle, Logo, Search, and Create Board */}
        <div className="flex items-center gap-x-3 sm:gap-x-4 min-w-0">
          <MobileSidebar />

          <div className="flex items-center">
            <Logo />
          </div>

          {/* Quick Search Shortcut Display (Matches Mockup) */}
          <div className="hidden lg:flex items-center gap-2 h-9 px-3 w-52 xl:w-64 border border-[var(--landing-line)] bg-[var(--landing-panel)] rounded-sm text-xs text-[var(--landing-muted)] transition-colors hover:border-[var(--landing-line)] select-none">
            <Search className="size-3.5 shrink-0 text-[var(--landing-muted)]" />
            <span className="truncate">Quick search...</span>
            <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-line)] text-[var(--landing-muted)]">
              ⌘K
            </kbd>
          </div>

          {/* Create Board Button */}
          <FormPopover side="bottom" sideOffSet={16} align="start">
            <Button
              size="sm"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:brightness-110 font-bold text-xs rounded-sm shadow-sm cursor-pointer transition-all hover:shadow-[0_0_16px_rgba(255,118,25,0.3)] shrink-0"
            >
              <Plus className="size-4" />
              <span>Create Board</span>
            </Button>
          </FormPopover>

          <FormPopover side="bottom" sideOffSet={16} align="start">
            <Button
              size="sm"
              className="sm:hidden grid size-9 place-items-center bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] rounded-sm p-0 cursor-pointer shadow-sm hover:brightness-110"
            >
              <Plus className="size-4" />
            </Button>
          </FormPopover>
        </div>

        {/* Right Section: Theme Toggle, Org Switcher, User Button */}
        <div className="flex items-center gap-x-2 sm:gap-x-2.5 shrink-0">
          <ThemeToggle />

          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterSelectOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-org"
            appearance={{
              elements: {
                rootBox: "flex items-center justify-center",
                organizationSwitcherTrigger:
                  "h-9 px-3 text-xs font-semibold text-[var(--landing-text)] border border-[var(--landing-line)] bg-[var(--landing-panel)] hover:bg-[var(--landing-panel-strong)] hover:border-[var(--landing-orange)]/60 rounded-sm transition-all duration-200 shadow-2xs",
                organizationSwitcherPopoverCard:
                  "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-2xl !rounded-sm",
                organizationPreviewMainIdentifier:
                  "!text-[var(--landing-text)] font-semibold text-xs",
                organizationPreviewSecondaryIdentifier:
                  "!text-[var(--landing-muted)] text-[11px]",
                organizationSwitcherPopoverActionButton:
                  "!text-[var(--landing-text)] hover:!bg-[var(--landing-panel-strong)] !rounded-sm",
                organizationSwitcherPopoverActionButtonText:
                  "!text-[var(--landing-text)] font-medium text-xs",
              },
            }}
          />

          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-8.5 rounded-sm ring-1 ring-[var(--landing-line)]",
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
