"use client";

import { useState, useRef } from "react";
import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/forms/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null!);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
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

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: () => {
      disableEditing();
      router.refresh();
      toast.success("List created successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    await execute({ title, boardId });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-sm bg-[var(--landing-panel)] border border-[var(--landing-line)] space-y-3 shadow-md"
        >
          <FormInput
            id="title"
            errors={fieldErrors}
            placeholder="Enter list title..."
            classname="px-2 py-1 h-8 text-sm font-medium"
          />

          <input
            type="text"
            hidden
            value={params.boardId as string}
            name="boardId"
          />
          <div className="flex items-center gap-2">
            <FormSubmit classname="bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:brightness-110 rounded-sm text-xs font-semibold h-8 px-3">
              Add List
            </FormSubmit>
            <Button
              type="button"
              onClick={disableEditing}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 rounded-sm cursor-pointer text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="flex items-center p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-sm border border-white/20 hover:border-white/40 shadow-sm font-medium text-xs text-white transition w-full cursor-pointer"
      >
        <Plus className="w-4 h-4 mr-2 text-[var(--landing-orange)]" />
        Add another list
      </button>
    </ListWrapper>
  );
};
