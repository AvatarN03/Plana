"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useBoardFilters, DueFilterType } from "@/hooks/use-board-filters";
import { Filter, Search, X } from "lucide-react";

export const BoardFilter = () => {
  const {
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    dueFilter,
    setDueFilter,
    resetFilters,
  } = useBoardFilters();

  const isFiltered = Boolean(
    searchQuery.trim() || priorityFilter || dueFilter !== "ALL"
  );

  return (
    <div className="flex items-center gap-x-2">
      {/* Quick Search Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-2.5 h-3.5 w-3.5 text-white/70 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter cards..."
          className="h-8 pl-8 pr-7 text-xs bg-white/15 hover:bg-white/25 focus:bg-white focus:text-neutral-900 focus:placeholder-neutral-400 placeholder-white/70 text-white rounded-md border border-white/20 focus:border-white focus:outline-none transition w-32 md:w-44"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 text-white/80 hover:text-white cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filter Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="transparent"
            className={`h-8 px-2.5 text-xs font-medium cursor-pointer border ${
              isFiltered
                ? "bg-white text-neutral-900 border-white hover:bg-white/90"
                : "text-white border-white/20 hover:bg-white/20"
            }`}
          >
            <Filter className="h-3.5 w-3.5 mr-1.5" />
            Filters
            {isFiltered && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-semibold">
                active
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 p-3 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-xs font-semibold text-neutral-700">Filter cards</span>
            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] text-red-600 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Priority filter */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              Priority
            </span>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {[
                { label: "All Priorities", value: null },
                { label: "Urgent", value: "URGENT" },
                { label: "High", value: "HIGH" },
                { label: "Medium", value: "MEDIUM" },
                { label: "Low", value: "LOW" },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPriorityFilter(p.value)}
                  className={`px-2 py-1 rounded text-left text-xs transition cursor-pointer ${
                    priorityFilter === p.value
                      ? "bg-neutral-900 text-white font-medium"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Due date filter */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              Due Date
            </span>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {[
                { label: "All dates", value: "ALL" as DueFilterType },
                { label: "Overdue", value: "OVERDUE" as DueFilterType },
                { label: "Due Today", value: "DUE_TODAY" as DueFilterType },
                { label: "Has due date", value: "HAS_DUE" as DueFilterType },
              ].map((d) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setDueFilter(d.value)}
                  className={`px-2 py-1 rounded text-left text-xs transition cursor-pointer ${
                    dueFilter === d.value
                      ? "bg-neutral-900 text-white font-medium"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
