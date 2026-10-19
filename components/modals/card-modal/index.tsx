"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { Header } from "./Header";
import { Description } from "./Description";
import { Actions } from "./Actions";
import { AuditLog } from "@/lib/generated/prisma/client";
import { Activity } from "./Activity";
import { CardMeta } from "./card-meta";
import { Checklist } from "./checklist";
import { cn } from "@/lib/utils";
import { Activity as ActivityIcon, LayoutList } from "lucide-react";

export const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal();
  const [activeTab, setActiveTab] = useState<"details" | "activity">("details");

  // Reset tab to details whenever card changes or opens
  useEffect(() => {
    setActiveTab("details");
  }, [id, isOpen]);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
    enabled: !!id,
  });

  const { data: cardAuditLogs } = useQuery<AuditLog[]>({
    queryKey: ["card-log", id],
    queryFn: () => fetcher(`/api/cards/${id}/log`),
    enabled: !!id,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-[95vw] max-w-[calc(100vw-1rem)] sm:max-w-2xl md:max-w-4xl max-h-[85dvh] sm:max-h-[88vh] p-0 rounded-xl sm:rounded-2xl bg-slate-950/95 border-slate-800/90 shadow-2xl backdrop-blur-xl overflow-hidden gap-0">
        <DialogTitle className="sr-only">Card Details</DialogTitle>

        {/* Pinned Top Header */}
        <div className="p-4 sm:p-6 pb-0 shrink-0">
          {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-3.5 sm:pt-4 space-y-4 sm:space-y-5">
          {cardData && <CardMeta data={cardData} />}

          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden items-center p-1 rounded-lg bg-[var(--landing-panel)] border border-[var(--landing-line)] w-full">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-1.5 px-3 text-xs font-medium rounded-md transition-all cursor-pointer",
                activeTab === "details"
                  ? "bg-[var(--landing-panel-strong)] text-[var(--landing-text)] font-semibold border border-[var(--landing-orange)]/60 shadow-2xs"
                  : "text-[var(--landing-muted)] hover:text-[var(--landing-text)] border border-transparent"
              )}
            >
              <LayoutList className="w-3.5 h-3.5 text-[var(--landing-orange)]" />
              <span>Details</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("activity")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-1.5 px-3 text-xs font-medium rounded-md transition-all cursor-pointer",
                activeTab === "activity"
                  ? "bg-[var(--landing-panel-strong)] text-[var(--landing-text)] font-semibold border border-[var(--landing-orange)]/60 shadow-2xs"
                  : "text-[var(--landing-muted)] hover:text-[var(--landing-text)] border border-transparent"
              )}
            >
              <ActivityIcon className="w-3.5 h-3.5 text-[var(--landing-orange)]" />
              <span>Activity</span>
              {cardAuditLogs && cardAuditLogs.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                  {cardAuditLogs.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile View: Render active tab content */}
          <div className="block md:hidden space-y-4">
            {activeTab === "details" ? (
              <>
                {!cardData ? (
                  <Description.Skeleton />
                ) : (
                  <Description data={cardData} />
                )}

                {cardData && (
                  <Checklist cardId={cardData.id} items={cardData.checklists} />
                )}

                <div className="pt-3 border-t border-slate-800/80">
                  {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
                </div>
              </>
            ) : (
              <>
                {!cardAuditLogs ? (
                  <Activity.Skeleton />
                ) : (
                  <Activity items={cardAuditLogs} />
                )}
              </>
            )}
          </div>

          {/* Desktop View: Standard 2-Column Productivity Layout */}
          <div className="hidden md:grid md:grid-cols-7 gap-6 mt-1">
            {/* Main Content Column (70%) */}
            <div className="md:col-span-5 space-y-6 min-w-0">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}

              {cardData && (
                <Checklist cardId={cardData.id} items={cardData.checklists} />
              )}

              {!cardAuditLogs ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={cardAuditLogs} />
              )}
            </div>

            {/* Action Sidebar Column (30%) */}
            <div className="md:col-span-2 space-y-4 md:border-l md:border-slate-800/80 md:pl-6 min-w-0">
              {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


