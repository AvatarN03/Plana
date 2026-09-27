"use client";
import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@/lib/generated/prisma/client"
import { Draggable } from "@hello-pangea/dnd"

interface CardItemProps {
  data: Card,
  index: number
}

export const CardItem = ({
  data, index
}: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {
        (provided) => (

          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            onClick={()=>cardModal.onOpen(data.id)}
            className="rounded-sm text-sm truncate p-3 bg-white border border-transparent hover:border-black shadow-sm" role="button">
            {
              data.title
            }
          </div>
        )
      }
    </Draggable>
  )
}
