"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@/lib/generated/prisma/client";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const { execute } = useAction(updateBoard, {
    onSuccess: (updated) => {
      setTitle(updated.title);
      toast.success(`Board updated: ${updated.title}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const rawTitle = formData.get("title") as string;
    const trimmedTitle = rawTitle?.trim();

    // Prevent submission if unchanged or empty/whitespace
    if (!trimmedTitle || trimmedTitle === title.trim()) {
      disableEditing();
      return;
    }

    try {
      execute({ title: trimmedTitle, id: data.id });
    } catch {
      console.log("board update failed");
    } finally {
      disableEditing();
    }
  };

  const onBlur = () => {
    const currentValue = inputRef.current?.value?.trim();
    if (!currentValue || currentValue === title.trim()) {
      disableEditing();
      return;
    }
    formRef?.current?.requestSubmit();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef}>
        <FormInput
          id="title"
          ref={inputRef}
          defaultValue={title}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          classname="text-lg! font-bold bg-black/30 hover:bg-black/40 focus:bg-black/60 text-white rounded-md px-3 py-1 border border-white/20 focus:border-[var(--landing-orange)] h-9"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="w-auto h-auto cursor-pointer font-bold text-lg hover:bg-white/10 px-3 py-1.5 rounded-md transition"
    >
      {title}
    </Button>
  );
};
