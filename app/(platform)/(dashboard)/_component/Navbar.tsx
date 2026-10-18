"use client";

import { usePathname } from "next/navigation";
import Logo from "@/components/custom/Logo";
import { MobileSidebar } from "./MobileSidebar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
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
        </div>

        {/* Right Section: Theme Toggle, Org Switcher, User Button */}
        <div className="flex items-center gap-x-2 sm:gap-x-3 shrink-0">

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
              variables: {
                colorPrimary: "#ff7619",
                colorText: "var(--landing-text)",
                colorTextSecondary: "var(--landing-muted)",
                colorBackground: "var(--landing-panel)",
                colorInputBackground: "var(--landing-panel-strong)",
                colorInputText: "var(--landing-text)",
              },
              elements: {
                avatarBox: "size-8.5 rounded-md ring-1 ring-[var(--landing-line)] hover:ring-[var(--landing-orange)]/60 transition",
                userButtonPopoverCard:
                  "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-2xl !rounded-xl !text-[var(--landing-text)]",
                userButtonPopoverRoot:
                  "!text-[var(--landing-text)]",
                userButtonPopoverMain:
                  "!bg-[var(--landing-panel)] !text-[var(--landing-text)]",
                userButtonPopoverActionButton:
                  "!text-[var(--landing-text)] hover:!bg-[var(--landing-panel-strong)] !rounded-lg transition-colors",
                userButtonPopoverActionButtonText:
                  "!text-[var(--landing-text)] font-medium text-xs",
                userButtonPopoverActionButtonIcon:
                  "!text-[var(--landing-orange)]",
                userButtonPopoverFooter:
                  "!border-t !border-[var(--landing-line)] !bg-[var(--landing-panel)] !text-[var(--landing-muted)]",
                userPreview:
                  "!text-[var(--landing-text)]",
                userPreviewMainIdentifier:
                  "!text-[var(--landing-text)] font-semibold text-xs",
                userPreviewSecondaryIdentifier:
                  "!text-[var(--landing-muted)] text-[11px]",
                userButtonPopoverCustomItemButton:
                  "!text-[var(--landing-text)] hover:!bg-[var(--landing-panel-strong)] !rounded-lg",
              },
            }}
            userProfileProps={{
              appearance: {
                variables: {
                  colorPrimary: "#ff7619",
                  colorText: "var(--landing-text)",
                  colorTextSecondary: "var(--landing-muted)",
                  colorBackground: "var(--landing-panel)",
                  colorInputBackground: "var(--landing-panel-strong)",
                  colorInputText: "var(--landing-text)",
                },
                elements: {
                  card: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !text-[var(--landing-text)] !rounded-xl",
                  navbar: "!border-r !border-[var(--landing-line)] !bg-[var(--landing-bg)]",
                  navbarButton: "!text-[var(--landing-muted)] hover:!text-[var(--landing-text)] hover:!bg-[var(--landing-panel-strong)] !rounded-md",
                  headerTitle: "!text-[var(--landing-text)]",
                  headerSubtitle: "!text-[var(--landing-muted)]",
                  profileSectionTitle: "!text-[var(--landing-text)]",
                  profileSectionContent: "!text-[var(--landing-text)]",
                  breadcrumbsItem: "!text-[var(--landing-muted)]",
                  breadcrumbsItemCurrent: "!text-[var(--landing-text)]",
                  formButtonPrimary: "!bg-[var(--landing-orange)] hover:!bg-[var(--landing-orange)]/90 !text-white",
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
