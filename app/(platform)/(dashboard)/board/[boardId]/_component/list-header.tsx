
"use client"
import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/forms/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@/lib/generated/prisma/client"
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ListOptions } from "./list-options";


interface ListHeaderProps {
  data: List,
  onAddCard: ()=>void
}


export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null!);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef?.current?.select();
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

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      disableEditing();
      setTitle(data.title)
      toast.success(`List Renamed to : ${data.title}`);
    },
    onError: (error) => {
      toast.error(error);
    }
  })

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    const id = formData.get("id") as string;

    if(title === data.title) disableEditing();

    await execute({ title, id,  boardId });
  }

  const onBlur = ()=>{
    formRef.current.requestSubmit();
  }

  return (
    <div className="p-2.5 pb-1 font-semibold text-sm flex items-center justify-between gap-x-2">
      {
        isEditing ? (
          <form ref={formRef} action={onSubmit} className="flex-1">
            <input type="text" hidden id="id" name="id" defaultValue={data.id} />
            <input type="text" hidden id="boardId" name="boardId" defaultValue={data.boardId} />
            <FormInput
              ref={inputRef}
              errors={fieldErrors}
              id="title"
              onBlur={onBlur}
              placeholder="Edit the list name..."
              defaultValue={title}
              classname="text-sm font-semibold bg-black/40 text-white rounded-md px-2.5 py-1 border border-white/20 focus:border-[var(--landing-orange)] h-8"
            />
            <input type="submit" hidden />
          </form>
        ) : (

          <div className="w-full px-2.5 py-1 h-7 text-sm font-semibold text-[var(--landing-text)] hover:bg-white/5 rounded-md transition cursor-pointer" onClick={enableEditing}>
            {title}
          </div>
        )
      }

      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  )
}
