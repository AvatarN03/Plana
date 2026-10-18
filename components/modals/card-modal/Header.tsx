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
    <div className="flex items-start gap-x-3.5 w-full pb-4 border-b border-slate-800/80">
      <div className="p-2 rounded-xl bg-[var(--landing-orange)]/15 border border-[var(--landing-orange)]/30 mt-0.5 shrink-0">
        <CreditCard className="w-5 h-5 text-[var(--landing-orange)]" />
      </div>
      <div className="w-full space-y-1.5">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            id="title"
            onBlur={onBlur}
            defaultValue={title}
            classname="font-bold text-xl sm:text-2xl tracking-tight bg-transparent hover:bg-slate-900/40 focus-visible:bg-slate-900 focus-visible:ring-1 focus-visible:ring-[var(--landing-orange)]/50 border border-transparent focus-visible:border-[var(--landing-orange)] rounded-lg px-2.5 py-1 text-white transition-all w-full"
          />
          <input type="submit" hidden />
        </form>
        <div className="flex items-center gap-2 pl-2.5 text-xs text-slate-400">
          <span>in list</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-200 font-medium">
            {data.list.title}
          </span>
        </div>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3.5 pb-4 border-b border-slate-800/80 w-full">
      <Skeleton className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-3/4 h-8 rounded-lg bg-slate-900 border border-slate-800" />
        <Skeleton className="w-28 h-5 rounded-md bg-slate-900 border border-slate-800" />
      </div>
    </div>
  );
};