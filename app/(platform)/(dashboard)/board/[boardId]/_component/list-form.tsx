"use client";

import { useState, useRef } from "react"
import { Plus, X } from 'lucide-react';
import { ListWrapper } from './list-wrapper'
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
    })
  }

  const disableEditing = () => {
    setIsEditing(false);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Escape') {
      disableEditing();
    }
  }

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: () => {
      disableEditing();
      router.refresh();
      toast.success("List created successfully");
    },
    onError: (error) => {
      toast.error(error);
    }
  })

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    await execute({ title, boardId });
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form action={onSubmit} ref={formRef} className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
          <FormInput
            id="title"
            errors={fieldErrors}
            placeholder="Enter the list title..."
            classname="px-2 py-1 h-7 text-sm font-medium border-transparent hover:border-input focus:border-input transition"
          />

          <input type="text"
            hidden
            value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-3">
            <FormSubmit>Add List</FormSubmit>
            <Button
              onClick={disableEditing}
              size={"sm"}
              variant={"destructive"}
              className="cursor-pointer"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }


  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='flex items-center p-4 bg-white/80 rounded-md shadow-md font-medium text-sm hover:bg-white/50 transition w-full cursor-pointer'
      >
        <Plus className="w-4 h-4 mr-2" />
        Add List
      </button>
    </ListWrapper>
  )
}
