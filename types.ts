import { Card, List } from "./lib/generated/prisma/client";

export interface CardWithList extends Card {
    list: List;
}