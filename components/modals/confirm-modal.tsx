"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
  header?: string;
  description?: string;
  confirmText?: string;
  variant?: "default" | "destructive";
}

export const ConfirmModal = ({
  children,
  onConfirm,
  disabled,
  header = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  variant = "destructive",
}: ConfirmModalProps) => {
  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={disabled}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] max-w-[320px] p-4 bg-[var(--landing-panel)] border-[var(--landing-line)] text-[var(--landing-text)] rounded-[8px] shadow-2xl">
        <AlertDialogHeader className="text-left pb-1">
          <AlertDialogTitle className="text-sm font-semibold text-[var(--landing-text)]">{header}</AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-[var(--landing-muted)]">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-end gap-2 mt-2">
          <AlertDialogCancel disabled={disabled} className="h-7.5 px-3 text-xs rounded-[5px] text-[var(--landing-muted)] hover:text-[var(--landing-text)] border-[var(--landing-line)] bg-transparent hover:bg-[var(--landing-panel-strong)] cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={disabled}
            onClick={handleConfirm}
            className={
              variant === "destructive"
                ? "h-7.5 px-3 text-xs rounded-[5px] bg-red-600 hover:bg-red-700 text-white font-medium cursor-pointer"
                : "h-7.5 px-3 text-xs rounded-[5px] bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] font-semibold cursor-pointer"
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

