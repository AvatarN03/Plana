"use client";

import { List, Card } from "@/lib/generated/prisma/client";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

// extend prisma List type to include cards relation
export type ListWithCards = List & {
  cards: Card[];
};

interface ListContainerProps {
    boardId: string;
    data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

export const ListContainer = ({
    boardId, data
}: ListContainerProps) => {

    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeOrderList } = useAction(updateListOrder, {
        onSuccess: (data) => toast.success("List Order is updated"),
        onError: (error) => toast.error(error)
    })

    const { execute: executeOrderCard } = useAction(updateCardOrder, {
        onSuccess: (data) => toast.success("Card Order is updated"),
        onError: (error) => toast.error(error)
    })

    useEffect(() => {
        setOrderedData(data);
    }, [data])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;
        console.log(result)
        if (!destination) return;

        // if the dest-source is same
        if (destination.droppableId === source.droppableId && destination.index === source.index
        ) return;

        if (type === 'list') {

            const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({
                ...item, order: index,
            }));

            setOrderedData(items);
            // server action;
            executeOrderList({ items, boardId })
        }

        // if the type is card
        if (type === 'card') {
            const newOrderedData = [...orderedData];
            let sourceList: ListWithCards | undefined;
            let destList: ListWithCards | undefined;
            newOrderedData.map(list => {
                if (list.id === source.droppableId) {
                    sourceList = list;
                }
                if (list.id === destination.droppableId) {
                    destList = list;
                }
            })

            if (!sourceList || !destList) return;

            if (!sourceList.cards) {
                sourceList.cards = [];

            }

            if (!destList.cards) {
                destList.cards = [];

            }

            // moving the card in same list;
            if (source.droppableId === destination.droppableId) {
                const reOrderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                )

                reOrderedCards.forEach((card, index) => { card.order = index })

                sourceList.cards = reOrderedCards;
                setOrderedData(newOrderedData);
                executeOrderCard({ items: reOrderedCards, boardId });
            } else {
                // moving the card to different list;
                const [movedCard] = sourceList.cards.splice(source.index, 1);
                
                movedCard.listId = destination.droppableId;
                
                destList.cards.splice(destination.index, 0, movedCard);
                
                sourceList.cards.forEach((card, idx) => card.order = idx)
                destList.cards.forEach((card, idx) => card.order = idx)
                
                setOrderedData(newOrderedData);
                
                executeOrderCard({ items: destList.cards, boardId });
            }


        }

    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>

            <Droppable droppableId={"lists"} direction="horizontal" type="list">
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full">
                        {
                            orderedData.map((list, index) => (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    data={list}
                                />
                            ))
                        }

                        {provided.placeholder}

                        <ListForm />

                        <div className="flex shrink w-1" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    )
}
