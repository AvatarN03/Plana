"use client";

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

export const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal();

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
      <DialogContent className="w-[95vw] max-w-[calc(100vw-1rem)] sm:max-w-2xl md:max-w-4xl p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-slate-950/95 border-slate-800/90 shadow-2xl backdrop-blur-xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto gap-4 sm:gap-5">
        <DialogTitle className="sr-only">Card Details</DialogTitle>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}

        <div className="grid grid-cols-1 md:grid-cols-7 gap-5 sm:gap-6 mt-1">
          {/* Main Content Column (70%) */}
          <div className="md:col-span-5 space-y-5 sm:space-y-6 min-w-0">
            {cardData && <CardMeta data={cardData} />}

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
          <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-800/80 md:border-t-0 md:border-l md:border-slate-800/80 md:pl-6 md:pt-1 min-w-0">
            {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

