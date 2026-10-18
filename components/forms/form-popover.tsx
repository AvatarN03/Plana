"use client";

import { Layout, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { useState } from "react";
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
      <DialogContent
        showCloseButton={false}
        className="w-[95vw] sm:max-w-[480px] p-6 border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] rounded-[12px] shadow-2xl"
      >
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 h-8 w-8 p-0 cursor-pointer rounded-md text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>

        <DialogHeader className="pb-3 border-b border-[var(--landing-line)] text-left">
          <DialogTitle className="text-base font-semibold text-[var(--landing-text)] flex items-center gap-2">
            <Layout className="w-4 h-4 text-[var(--landing-orange)]" />
            Create Board
          </DialogTitle>
          <DialogDescription className="text-xs text-[var(--landing-muted)] mt-1">
            A board contains lists of cards to organize your tasks, team workflow, or sprint.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 pt-2" action={onSubmit}>
          <div className="space-y-3.5">
            {/* Cover Picker */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[var(--landing-text)]">
                  Board Cover
                </label>
                <span className="text-[11px] text-[var(--landing-muted)]">
                  Photos by Unsplash
                </span>
              </div>
              <FormPicker id="cover" errors={fieldErrors} />
            </div>

            {/* Board Title */}
            <div className="space-y-1.5">
              <FormInput
                label="Board Title"
                id="title"
                type="text"
                placeholder="e.g. Project Roadmap, Sprint 4..."
                errors={fieldErrors}
                required
                labelClassname="text-xs font-semibold text-[var(--landing-text)]"
                classname="h-10 text-sm rounded-md px-3 bg-[var(--landing-panel-strong)] border-[var(--landing-line)] placeholder:text-[var(--landing-muted)] text-[var(--landing-text)]"
              />
            </div>

            {/* Starter Template */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="template"
                  className="text-xs font-semibold text-[var(--landing-text)]"
                >
                  Starter Template
                </label>
                <span className="text-[11px] text-[var(--landing-muted)]">
                  Preconfigured workflow
                </span>
              </div>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger
                  id="template"
                  className="w-full h-10 text-sm bg-[var(--landing-panel-strong)] border-[var(--landing-line)] text-[var(--landing-text)] rounded-md px-3 focus-visible:ring-1 focus-visible:ring-[var(--landing-orange)] cursor-pointer"
                >
                  <SelectValue placeholder="Choose a starter template" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--landing-panel)] border-[var(--landing-line)] text-[var(--landing-text)] rounded-lg shadow-2xl">
                  <SelectItem
                    value="BLANK"
                    className="text-sm py-2 hover:bg-[var(--landing-panel-strong)] cursor-pointer focus:bg-[var(--landing-panel-strong)]"
                  >
                    <div className="text-left">
                      <div className="font-medium text-[var(--landing-text)]">Blank Board</div>
                      <div className="text-[11px] text-[var(--landing-muted)]">Empty canvas with no initial lists</div>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="SOFTWARE"
                    className="text-sm py-2 hover:bg-[var(--landing-panel-strong)] cursor-pointer focus:bg-[var(--landing-panel-strong)]"
                  >
                    <div className="text-left">
                      <div className="font-medium text-[var(--landing-text)]">Software Kanban</div>
                      <div className="text-[11px] text-[var(--landing-muted)]">5 lists: Backlog, To Do, In Progress, In Review, Done</div>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="PERSONAL"
                    className="text-sm py-2 hover:bg-[var(--landing-panel-strong)] cursor-pointer focus:bg-[var(--landing-panel-strong)]"
                  >
                    <div className="text-left">
                      <div className="font-medium text-[var(--landing-text)]">Personal Tasks</div>
                      <div className="text-[11px] text-[var(--landing-muted)]">4 lists: Ideas, To Do, In Progress, Done</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2">
            <FormSubmit classname="w-full cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:brightness-110 rounded-md text-sm font-semibold h-10 shadow-sm transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Create Board
            </FormSubmit>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
