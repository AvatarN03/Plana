import { Card, List, CardLabel, ChecklistItem, CardAssignee } from "./lib/generated/prisma/client";

export interface CardWithList extends Card {
  list: List;
  labels?: CardLabel[];
  checklists?: ChecklistItem[];
  assignees?: CardAssignee[];
}

export type CardDetails = Card & {
  list: {
    title: string;
  };
  labels: CardLabel[];
  checklists: ChecklistItem[];
  assignees: CardAssignee[];
};