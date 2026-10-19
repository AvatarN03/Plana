import { useRef, useState } from "react"
import { ListWithCards } from "./list-container"
import { ListHeader } from "./list-header"
import { CardForm } from "./card-form"
import { cn } from "@/lib/utils"
import { CardItem } from "./card-item"
import { Draggable, Droppable } from "@hello-pangea/dnd"

interface ListItemProps {
    data: ListWithCards;
    index: number;
    isDragDisabled?: boolean;
}

export const ListItem = ({
    data, index, isDragDisabled
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
        <Draggable draggableId={data.id} index={index} isDragDisabled={isDragDisabled}>
            {
                (provided, snapshot) => (
                    <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={cn(
                            "shrink-0 h-full w-68 select-none transition-shadow",
                            snapshot.isDragging && "z-50"
                        )}
                        style={{
                            ...provided.draggableProps.style,
                            ...(snapshot.isDragging ? { zIndex: 999 } : {})
                        }}>
                        <div
                            {...provided.dragHandleProps}
                            className={cn(
                                "w-full rounded-lg bg-[var(--landing-panel)]/95 border border-[var(--landing-line)] shadow-md pb-2 text-[var(--landing-text)] backdrop-blur-sm",
                                snapshot.isDragging && "ring-2 ring-[var(--landing-orange)]/60 shadow-2xl"
                            )}>

                            <ListHeader
                                data={data} onAddCard={enableEditing} />

                            <Droppable 
                                droppableId={data.id} 
                                type="card"
                                renderClone={(cloneProvided, cloneSnapshot, rubric) => {
                                    const card = data.cards[rubric.source.index];
                                    if (!card) return null;
                                    return (
                                        <CardItem
                                            data={card}
                                            index={rubric.source.index}
                                            isClone
                                            provided={cloneProvided}
                                            snapshot={cloneSnapshot}
                                        />
                                    );
                                }}
                            >
                                {
                                    (provided) => (
                                        <ol 
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2", data.cards.length > 0 ? "mt-2" : "mt-0")}
                                        >
                                            {
                                                data.cards.map((card, index) => (
                                                    <CardItem
                                                        key={card.id}
                                                        index={index}
                                                        data={card}
                                                        isDragDisabled={isDragDisabled}
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
