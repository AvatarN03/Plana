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
      <DialogContent className="sm:max-w-2xl md:max-w-4xl p-6 sm:p-7 rounded-2xl bg-slate-950/95 border-slate-800/90 shadow-2xl backdrop-blur-xl max-h-[90vh] overflow-y-auto gap-5">
        <DialogTitle className="sr-only">Card Details</DialogTitle>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}

        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mt-1">
          {/* Main Content Column (70%) */}
          <div className="md:col-span-5 space-y-6">
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
          <div className="md:col-span-2 space-y-4 pt-1 md:border-l md:border-slate-800/80 md:pl-6">
            {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

