"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  userId?: string | null;
  orgId?: string | null;
}

export function MobileNav({ userId, orgId }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        className="grid size-9 place-items-center rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] hover:text-[var(--landing-orange)] transition-colors cursor-pointer"
      >
        {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-50 border-b border-[var(--landing-line)] bg-[var(--landing-bg)]/96 backdrop-blur-2xl px-6 py-6 shadow-2xl transition-all duration-200 animate-fade-in-up">
          <nav className="flex flex-col gap-4 text-base font-semibold text-[var(--landing-text)]">
            <a
              href="#product"
              onClick={close}
              className="py-1 hover:text-[var(--landing-orange)] transition-colors"
            >
              01. Boards
            </a>
            <a
              href="#workflow"
              onClick={close}
              className="py-1 hover:text-[var(--landing-orange)] transition-colors"
            >
              02. Workflow
            </a>
            <a
              href="#activity"
              onClick={close}
              className="py-1 hover:text-[var(--landing-orange)] transition-colors"
            >
              03. Activity &amp; Cards
            </a>
            <a
              href="#workspaces"
              onClick={close}
              className="py-1 hover:text-[var(--landing-orange)] transition-colors"
            >
              04. Workspaces
            </a>
          </nav>

          <div className="mt-6 pt-6 border-t border-[var(--landing-line)] flex flex-col gap-3">
            {userId ? (
              <Button
                className="w-full bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] font-bold rounded-none h-11"
                asChild
              >
                <Link
                  href={orgId ? `/organization/${orgId}` : "/select-org"}
                  onClick={close}
                >
                  Go to Workspace
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] font-semibold rounded-none h-11"
                  asChild
                >
                  <Link href="/sign-in" onClick={close}>
                    Log in
                  </Link>
                </Button>
                <Button
                  className="w-full bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] font-bold rounded-none h-11"
                  asChild
                >
                  <Link href="/sign-up" onClick={close}>
                    Get Plana Free
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
