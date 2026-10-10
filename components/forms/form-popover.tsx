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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
  const [template, setTemplate] = useState<string>("BLANK");
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
    const selectedTemplate =
      (template as "BLANK" | "SOFTWARE" | "PERSONAL") || undefined;
    await execute({ title, image, template: selectedTemplate });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[92vw] max-w-[360px] p-4 sm:p-5 border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] rounded-[10px] shadow-2xl">
        <DialogHeader className="pb-2.5 border-b border-[var(--landing-line)]">
          <DialogTitle className="text-xs font-mono uppercase tracking-wider text-center text-[var(--landing-muted)] font-semibold">
            Create board
          </DialogTitle>
        </DialogHeader>

        <DialogClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2.5 top-2.5 h-6 w-6 p-0 cursor-pointer rounded-[4px] text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </DialogClose>

        <form className="space-y-3 pt-1" action={onSubmit}>
          <div className="space-y-3">
            <FormPicker id="cover" errors={fieldErrors} />
            <FormInput
              label="Board name"
              id="title"
              type="text"
              placeholder="e.g. Project Alpha"
              errors={fieldErrors}
              classname="h-8 rounded-[6px]"
            />
            <div className="space-y-1">
              <label
                htmlFor="template"
                className="text-xs font-semibold text-[var(--landing-text)]"
              >
                Starter Template
              </label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger
                  id="template"
                  className="w-full h-8 text-xs bg-[var(--landing-panel-strong)] border-[var(--landing-line)] text-[var(--landing-text)] rounded-[6px] focus-visible:ring-1 focus-visible:ring-[var(--landing-orange)] cursor-pointer"
                >
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--landing-panel)] border-[var(--landing-line)] text-[var(--landing-text)] rounded-[8px] shadow-xl">
                  <SelectItem
                    value="BLANK"
                    className="text-xs hover:bg-[var(--landing-panel-strong)] cursor-pointer"
                  >
                    Blank Board (Start fresh)
                  </SelectItem>
                  <SelectItem
                    value="SOFTWARE"
                    className="text-xs hover:bg-[var(--landing-panel-strong)] cursor-pointer"
                  >
                    Software Kanban (5 lists)
                  </SelectItem>
                  <SelectItem
                    value="PERSONAL"
                    className="text-xs hover:bg-[var(--landing-panel-strong)] cursor-pointer"
                  >
                    Personal Tasks (4 lists)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <FormSubmit classname="w-full cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:brightness-110 rounded-[6px] text-xs font-bold h-8.5 mt-2">
            Create board
          </FormSubmit>
        </form>
      </DialogContent>
    </Dialog>
  );
};
