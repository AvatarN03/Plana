import { create } from "zustand";

export type DueFilterType = "ALL" | "OVERDUE" | "DUE_TODAY" | "HAS_DUE";

interface BoardFiltersStore {
  searchQuery: string;
  priorityFilter: string | null;
  dueFilter: DueFilterType;
  setSearchQuery: (query: string) => void;
  setPriorityFilter: (priority: string | null) => void;
  setDueFilter: (due: DueFilterType) => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

export const useBoardFilters = create<BoardFiltersStore>((set, get) => ({
  searchQuery: "",
  priorityFilter: null,
  dueFilter: "ALL",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  setDueFilter: (dueFilter) => set({ dueFilter }),
  resetFilters: () =>
    set({
      searchQuery: "",
      priorityFilter: null,
      dueFilter: "ALL",
    }),
  hasActiveFilters: () => {
    const { searchQuery, priorityFilter, dueFilter } = get();
    return Boolean(searchQuery.trim() || priorityFilter || dueFilter !== "ALL");
  },
}));
