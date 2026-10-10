"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffSet?: number;
  align?: "start" | "center" | "end";
}

export const FormPopover = ({ children }: FormPopoverProps) => {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<ElementRef<typeof DialogClose>>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success(`Board created successfully: ${data.title}`);
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setOpen(false);
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error("Failed to create board", { description: error });
    },
  });

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("cover") as string;
    const template =
      (formData.get("template") as "BLANK" | "SOFTWARE" | "PERSONAL") ||
      undefined;
    await execute({ title, image, template });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-md p-6 border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] rounded-sm shadow-2xl">
        <DialogHeader className="pb-3 border-b border-[var(--landing-line)]">
          <DialogTitle className="text-sm font-mono uppercase tracking-wider text-center text-[var(--landing-muted)]">
            Create board
          </DialogTitle>
        </DialogHeader>

        <DialogClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-3 top-3 h-7 w-7 p-0 cursor-pointer rounded-sm text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>

        <form className="space-y-4 pt-2" action={onSubmit}>
          <div className="space-y-4">
            <FormPicker id="cover" errors={fieldErrors} />
            <FormInput
              label="Board name"
              id="title"
              type="text"
              placeholder="e.g. Project Alpha"
              errors={fieldErrors}
            />
            <div className="space-y-1.5">
              <label
                htmlFor="template"
                className="text-xs font-semibold text-[var(--landing-text)]"
              >
                Starter Template
              </label>
              <select
                name="template"
                id="template"
                defaultValue="BLANK"
                className="w-full text-xs p-2 border border-[var(--landing-line)] rounded-sm bg-[var(--landing-panel-strong)] text-[var(--landing-text)] focus:outline-none focus:border-[var(--landing-orange)] cursor-pointer"
              >
                <option
                  value="BLANK"
                  className="bg-[var(--landing-panel)] text-[var(--landing-text)]"
                >
                  Blank Board (Start from scratch)
                </option>
                <option
                  value="SOFTWARE"
                  className="bg-[var(--landing-panel)] text-[var(--landing-text)]"
                >
                  Software Kanban (5 lists)
                </option>
                <option
                  value="PERSONAL"
                  className="bg-[var(--landing-panel)] text-[var(--landing-text)]"
                >
                  Personal Tasks (4 lists)
                </option>
              </select>
            </div>
          </div>
          <FormSubmit classname="w-full cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:brightness-110 rounded-sm text-xs font-bold h-9">
            Create board
          </FormSubmit>
        </form>
      </DialogContent>
    </Dialog>
  );
};
