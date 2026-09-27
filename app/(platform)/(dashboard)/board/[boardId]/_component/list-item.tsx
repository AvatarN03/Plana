import { useRef, useState } from "react"
import { ListWithCards } from "./list-container"
import { ListHeader } from "./list-header"
import { CardForm } from "./card-form"
import { cn } from "@/lib/utils"
import { CardItem } from "./card-item"
import { Draggable, Droppable } from "@hello-pangea/dnd"


interface ListItemProps {
    data: ListWithCards,
    index: number
}


export const ListItem = ({
    data, index
}: ListItemProps) => {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const [isEditing, setIsEditing] = useState(false);


    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreaRef.current?.click();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    return (
        <Draggable draggableId={data.id} index={index}>
            {
                (provided) => (

                    <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="shrink-0 h-full w-68 select-none">
                        <div
                            {...provided.dragHandleProps}
                            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">

                            <ListHeader
                                data={data} onAddCard={enableEditing} />

                            <Droppable droppableId={data.id} type="card" >
                                {
                                    (provided) => (

                                        <ol 
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2", data.cards.length > 0 ? "mt-2" : "mt-0")}>
                                            {
                                                data.cards.map((card, index) => (
                                                    <CardItem
                                                        key={card.id}
                                                        index={index}
                                                        data={card}
                                                    />
                                                ))
                                            }
                                            {provided.placeholder}
                                        </ol>
                                    )
                                }
                            </Droppable>
                            <CardForm
                                listId={data.id}
                                enableEditing={enableEditing}
                                disableEditing={disableEditing}
                                isEditing={isEditing}
                                ref={textAreaRef}
                            />
                        </div>
                    </li>
                )
            }
        </Draggable>
    )
}
