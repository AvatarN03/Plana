"use client";

import { usePathname } from "next/navigation";
import { Plus, Search } from "lucide-react";
import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./MobileSidebar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { FormPopover } from "@/components/forms/form-popover";
import { ThemeToggle } from "@/app/(marketing)/_components/theme-toggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const isBoardPage = pathname.startsWith("/board/");

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 h-16 bg-[var(--landing-bg)]/95 backdrop-blur-md flex items-center border-b border-[var(--landing-line)] z-40 transition-all duration-200",
        isBoardPage ? "left-0 px-4 sm:px-6" : "left-0 md:left-64 px-4 sm:px-6 lg:px-8"
      )}
    >
      <div className="flex w-full items-center justify-between gap-x-4">
        {/* Left Section */}
        <div className="flex items-center gap-x-3 min-w-0">
          {/* Mobile hamburger on organization pages */}
          {!isBoardPage && <MobileSidebar />}

          {/* Show brand logo on mobile or when on full-canvas board page */}
          {(isBoardPage || !isBoardPage) && (
            <div className={cn("items-center", !isBoardPage ? "flex md:hidden" : "flex")}>
              <Logo />
            </div>
          )}

          {/* Desktop Search Bar matching concept image */}
          {!isBoardPage && (
            <div className="hidden md:flex items-center gap-2 h-9 px-3 w-64 xl:w-80 border border-[var(--landing-line)] bg-[var(--landing-panel)] rounded-sm text-xs text-[var(--landing-muted)] transition-colors hover:border-[var(--landing-line-strong)] select-none">
              <Search className="size-3.5 shrink-0 text-[var(--landing-muted)]" />
              <span className="truncate">Inline quick search...</span>
              <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-line)] text-[var(--landing-muted)]">
                Cmd+K
              </kbd>
            </div>
          )}

          {/* Primary Create Board Button */}
          <FormPopover side="bottom" sideOffSet={16} align="start">
            <Button
              size="sm"
              className={cn(
                "items-center gap-1.5 h-9 px-3.5 bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:brightness-110 font-bold text-xs rounded-sm shadow-sm cursor-pointer transition-all hover:shadow-[0_0_16px_rgba(255,118,25,0.3)] shrink-0",
                !isBoardPage ? "hidden md:inline-flex" : "hidden sm:inline-flex"
              )}
            >
              <Plus className="size-4" />
              <span>Create Board</span>
            </Button>
          </FormPopover>
        </div>

        {/* Right Section: Mobile + Create, Theme Toggle, Org Switcher, User Button */}
        <div className="flex items-center gap-x-2 sm:gap-x-3 shrink-0">
          {/* Mobile + Create Board Icon Button */}
          <FormPopover side="bottom" sideOffSet={16} align="end">
            <Button
              size="sm"
              className={cn(
                "grid size-9 place-items-center bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] rounded-sm p-0 cursor-pointer shadow-sm hover:brightness-110 shrink-0",
                !isBoardPage ? "md:hidden" : "sm:hidden"
              )}
            >
              <Plus className="size-4" />
            </Button>
          </FormPopover>

          <ThemeToggle />

          {/* Clerk Organization Switcher with Full Dark/Light Theme Integration */}
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterSelectOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-org"
            appearance={{
              variables: {
                colorPrimary: "#ff7619",
                colorText: "var(--landing-text)",
                colorTextSecondary: "var(--landing-muted)",
                colorBackground: "var(--landing-panel)",
                colorInputBackground: "var(--landing-panel-strong)",
                colorInputText: "var(--landing-text)",
              },
              elements: {
                rootBox: "flex items-center justify-center",
                organizationSwitcherTrigger:
                  "h-9 px-3 text-xs font-semibold text-[var(--landing-text)] border border-[var(--landing-line)] bg-[var(--landing-panel)] hover:bg-[var(--landing-panel-strong)] hover:border-[var(--landing-orange)]/60 rounded-sm transition-all duration-200 shadow-2xs flex items-center gap-2",
                organizationSwitcherTriggerIcon: "text-[var(--landing-muted)]",
                organizationSwitcherPopoverCard:
                  "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-2xl !rounded-sm !text-[var(--landing-text)]",
                organizationPreview:
                  "!text-[var(--landing-text)]",
                organizationPreviewMainIdentifier:
                  "!text-[var(--landing-text)] font-semibold text-xs",
                organizationPreviewSecondaryIdentifier:
                  "!text-[var(--landing-muted)] text-[11px]",
                organizationSwitcherPopoverActionButton:
                  "!text-[var(--landing-text)] hover:!bg-[var(--landing-panel-strong)] !rounded-sm",
                organizationSwitcherPopoverActionButtonText:
                  "!text-[var(--landing-text)] font-medium text-xs",
                organizationSwitcherPopoverActionButtonIcon:
                  "!text-[var(--landing-orange)]",
                organizationSwitcherPopoverFooter:
                  "!border-t !border-[var(--landing-line)] !bg-[var(--landing-panel)]",
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
