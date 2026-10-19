"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Plus, UserCheck, Users, X } from "lucide-react";
import Image from "next/image";

import { CardAssignee } from "@/lib/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { assignCardMember } from "@/actions/assign-card-member";
import { unassignCardMember } from "@/actions/unassign-card-member";

interface CardAssigneesProps {
  cardId: string;
  assignees?: CardAssignee[];
  hideTitle?: boolean;
}

export const CardAssignees = ({ cardId, assignees = [], hideTitle = false }: CardAssigneesProps) => {
  const { user } = useUser();
  const params = useParams();
  const boardId = params.boardId as string;
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const refreshCard = () => {
    queryClient.invalidateQueries({ queryKey: ["card", cardId] });
    queryClient.invalidateQueries({ queryKey: ["card-log", cardId] });
  };

  const { execute: executeAssign, isLoading: isAssigning } = useAction(assignCardMember, {
    onSuccess: () => {
      toast.success("Member assigned");
      setIsOpen(false);
      refreshCard();
    },
    onError: (err) => toast.error(err),
  });

  const { execute: executeUnassign } = useAction(unassignCardMember, {
    onSuccess: () => {
      toast.success("Member unassigned");
      refreshCard();
    },
    onError: (err) => toast.error(err),
  });

  const isAssignedToCurrentUser = user && assignees.some((a) => a.userId === user.id);

  const onAssignSelf = () => {
    if (!user) return;
    executeAssign({
      userId: user.id,
      userName: user.fullName || user.username || "Team Member",
      userImage: user.imageUrl,
      cardId,
      boardId,
    });
  };

  return (
    <div className="flex flex-col gap-1.5">
      {!hideTitle && (
        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] font-mono">
          Assignees
        </span>
      )}
      <div className="flex flex-wrap items-center gap-1.5 min-h-7">
        {assignees.map((assignee) => (
          <div
            key={assignee.id}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-slate-800 bg-slate-900 text-slate-200 text-xs font-medium"
          >
            {assignee.userImage ? (
              <Image
                src={assignee.userImage}
                alt={assignee.userName}
                width={16}
                height={16}
                className="w-4 h-4 rounded-full object-cover"
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-[var(--landing-orange)]/20 text-[var(--landing-orange)] flex items-center justify-center text-[9px] font-bold">
                {assignee.userName.charAt(0)}
              </div>
            )}
            <span className="max-w-[110px] truncate text-[11px]">
              {assignee.userName}
            </span>
            <button
              type="button"
              onClick={() => executeUnassign({ id: assignee.id, cardId, boardId })}
              className="hover:opacity-75 cursor-pointer ml-1 text-slate-400 hover:text-white"
              title="Unassign"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2.5 text-xs font-medium border border-dashed border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:border-[var(--landing-orange)] rounded-md cursor-pointer transition"
            >
              <Plus className="w-3.5 h-3.5 mr-1 text-[var(--landing-orange)]" />
              Assign
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-64 max-w-[calc(100vw-2rem)] p-3 border-slate-800 bg-slate-950 text-slate-200 rounded-lg shadow-2xl backdrop-blur-md"
            align="start"
            sideOffset={6}
            collisionPadding={12}
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                <Users className="w-3.5 h-3.5 text-[var(--landing-orange)]" />
                <span>Card Assignees</span>
              </div>
              {user && !isAssignedToCurrentUser && (
                <Button
                  onClick={onAssignSelf}
                  disabled={isAssigning}
                  size="sm"
                  variant="outline"
                  className="w-full flex items-center justify-start text-xs border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200 h-8 rounded-md cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 mr-2 text-[var(--landing-orange)]" />
                  Assign to me ({user.firstName || user.username})
                </Button>
              )}
              {isAssignedToCurrentUser && (
                <p className="text-xs text-slate-400 italic">
                  You are assigned to this card.
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
