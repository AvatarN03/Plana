"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "../../../hooks/use-card-modal";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { Header } from "./Header";
import { Suspense } from "react";
import { Description } from "./Description";
import { Actions } from "./Actions";
import { AuditLog } from "@/lib/generated/prisma/client";
import { Activity } from "./Activity";




export const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal();

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  })

  const { data: cardAuditLogs } = useQuery<AuditLog[]>({
    queryKey: ["card-log", id],
    queryFn: () => fetcher(`/api/cards/${id}/log`)
  })
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {
          !cardData ? <Header.Skeleton /> : <Header data={cardData} />
        }
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="col-span-full  md:col-span-3">
            <div className="w-full space-y-2">
              {
                !cardData ? <Description.Skeleton /> : <Description data={cardData} />
              }
              {
                cardAuditLogs ? <Activity.Skeleton /> : <Activity  />
              }
            </div>
          </div>
          {
            !cardData ? <Actions.Skeleton /> : <Actions data={cardData} />
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}
