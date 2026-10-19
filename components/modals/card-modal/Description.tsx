"use client";

import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/forms/form-submit";
import { FormTextArea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null!);
  const queryClient = useQueryClient();
  const [description, setDescription] = useState(data?.description);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef?.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const params = useParams();
  const boardId = params.boardId as string;

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (updated) => {
      queryClient.invalidateQueries({
        queryKey: ["card", updated.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-log", updated.id],
      });
      toast.success("Card description updated");
    },
    onError: (error) => toast.error(error),
  });

  const onSubmit = (formData: FormData) => {
    const raw = formData.get("description") as string;
    const trimmed = raw?.trim();
    if (trimmed === (data.description || "").trim()) {
      disableEditing();
      return;
    }

    execute({ id: data.id, boardId, description: trimmed });
    setDescription(trimmed);
    disableEditing();
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
        <div className="p-1.5 rounded-lg bg-[var(--landing-orange)]/15 border border-[var(--landing-orange)]/30 shrink-0">
          <AlignLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--landing-orange)]" />
        </div>
        <span>Description</span>
      </div>

      {isEditing ? (
        <form action={onSubmit} ref={formRef} className="space-y-2">
          <FormTextArea
            errors={fieldErrors}
            ref={textAreaRef}
            id="description"
            placeholder="Add a more detailed description to this card..."
            classname="w-full text-xs sm:text-sm rounded-xl p-3 sm:p-3.5 bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[var(--landing-orange)]/60 min-h-24 sm:min-h-28 leading-relaxed"
            defaultValue={description || undefined}
          />
          <div className="flex items-center gap-2">
            <FormSubmit classname="bg-[var(--landing-orange)] text-white hover:bg-[var(--landing-orange)]/90 rounded-md text-xs font-semibold h-8 px-4 cursor-pointer">
              Save
            </FormSubmit>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={disableEditing}
              className="text-slate-400 hover:text-white rounded-md h-8 text-xs cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          role="button"
          className="rounded-xl p-3.5 sm:p-4 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 text-xs sm:text-sm leading-relaxed text-slate-300 min-h-20 sm:min-h-24 transition cursor-pointer shadow-xs break-words"
        >
          {description ? (
            <span className="whitespace-pre-wrap break-words">{description}</span>
          ) : (
            <span className="text-slate-500 italic">
              Add more detail to this card...
            </span>
          )}
        </div>
      )}
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="space-y-2 w-full">
      <Skeleton className="w-28 h-5 rounded-md bg-slate-900 border border-slate-800" />
      <Skeleton className="w-full h-24 rounded-xl bg-slate-900 border border-slate-800" />
    </div>
  );
};