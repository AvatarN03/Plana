"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/forms/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";

interface HeaderProps {
  data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
  const [title, setTitle] = useState(data?.title);
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();

  const boardId = params.boardId as string;

  const { execute } = useAction(updateCard, {
    onSuccess: (updated) => {
      queryClient.invalidateQueries({
        queryKey: ["card", updated.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-log", updated.id],
      });
      toast.success(`Card title updated to "${updated.title}"`);
    },
    onError: (error) => toast.error(error),
  });

  const onBlur = () => {
    const val = inputRef.current?.value?.trim();
    if (!val || val === title.trim()) return;
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const rawTitle = formData.get("title") as string;
    const trimmed = rawTitle?.trim();
    if (!trimmed || trimmed === data.title.trim()) return;

    execute({ id: data.id, boardId, title: trimmed });
    setTitle(trimmed);
  };

  return (
    <div className="flex items-start gap-x-3 sm:gap-x-3.5 w-full pb-3.5 sm:pb-4 border-b border-slate-800/80 pr-9 sm:pr-8">
      <div className="p-1.5 sm:p-2 rounded-xl bg-[var(--landing-orange)]/15 border border-[var(--landing-orange)]/30 mt-0.5 shrink-0">
        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--landing-orange)]" />
      </div>
      <div className="w-full min-w-0 space-y-1.5">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            id="title"
            onBlur={onBlur}
            defaultValue={title}
            classname="font-bold text-lg sm:text-xl md:text-2xl tracking-tight bg-transparent hover:bg-slate-900/40 focus-visible:bg-slate-900 focus-visible:ring-1 focus-visible:ring-[var(--landing-orange)]/50 border border-transparent focus-visible:border-[var(--landing-orange)] rounded-lg px-2 sm:px-2.5 py-1 text-white transition-all w-full truncate"
          />
          <input type="submit" hidden />
        </form>
        <div className="flex items-center gap-2 pl-2 sm:pl-2.5 text-xs text-slate-400 min-w-0">
          <span className="shrink-0">in list</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-200 font-medium truncate max-w-[150px] sm:max-w-xs">
            {data.list.title}
          </span>
        </div>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 sm:gap-x-3.5 pb-3.5 sm:pb-4 border-b border-slate-800/80 w-full pr-9 sm:pr-8">
      <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 border border-slate-800 shrink-0" />
      <div className="flex-1 space-y-2 min-w-0">
        <Skeleton className="w-3/4 h-7 sm:h-8 rounded-lg bg-slate-900 border border-slate-800" />
        <Skeleton className="w-24 sm:w-28 h-5 rounded-md bg-slate-900 border border-slate-800" />
      </div>
    </div>
  );
};