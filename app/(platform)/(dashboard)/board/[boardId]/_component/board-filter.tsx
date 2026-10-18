"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useBoardFilters, DueFilterType } from "@/hooks/use-board-filters";
import { cn } from "@/lib/utils";
import { Check, Filter, Search, X } from "lucide-react";

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
    <div className="flex items-center gap-x-2.5">
      {/* Quick Search Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-white/50 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter cards..."
          className="h-9 pl-9 pr-8 text-sm bg-black/35 hover:bg-black/50 focus:bg-black/70 text-white placeholder-white/50 rounded-md border border-white/15 focus:border-[var(--landing-orange)] focus:ring-1 focus:ring-[var(--landing-orange)]/50 focus:outline-none transition w-36 sm:w-48 md:w-56"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 text-white/60 hover:text-white transition cursor-pointer p-0.5 rounded-sm"
            title="Clear search"
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
            className={cn(
              "h-9 px-3.5 text-sm font-medium cursor-pointer rounded-md border transition flex items-center gap-2",
              isFiltered
                ? "bg-[var(--landing-orange)]/20 border-[var(--landing-orange)] text-[var(--landing-orange)] hover:bg-[var(--landing-orange)]/30 font-semibold"
                : "bg-black/30 hover:bg-black/50 border-white/15 text-white/90 hover:text-white"
            )}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {isFiltered && (
              <span className="px-1.5 py-0.5 rounded-full bg-[var(--landing-orange)] text-white text-[10px] font-bold leading-none">
                active
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          collisionPadding={16}
          className="w-80 sm:w-96 p-4 space-y-4 rounded-lg border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] shadow-2xl backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--landing-line)]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--landing-orange)]" />
              <span className="text-sm font-semibold text-[var(--landing-text)]">
                Filter cards
              </span>
            </div>
            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[var(--landing-orange)] hover:underline cursor-pointer font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Priority filter */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-[var(--landing-muted)] uppercase tracking-wider block">
              Priority
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: "All Priorities", value: null, dot: "bg-slate-400" },
                { label: "Urgent", value: "URGENT", dot: "bg-red-500" },
                { label: "High", value: "HIGH", dot: "bg-amber-500" },
                { label: "Medium", value: "MEDIUM", dot: "bg-blue-500" },
                { label: "Low", value: "LOW", dot: "bg-slate-400" },
              ].map((p) => {
                const isSelected = priorityFilter === p.value;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPriorityFilter(p.value)}
                    className={cn(
                      "px-3 py-2 rounded-md text-xs sm:text-sm text-left transition cursor-pointer flex items-center justify-between border font-medium",
                      isSelected
                        ? "bg-[var(--landing-orange)] text-white border-[var(--landing-orange)] shadow-xs"
                        : "bg-[var(--landing-panel-strong)] hover:bg-[var(--landing-line)]/60 text-[var(--landing-text)] border-[var(--landing-line)]"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full", isSelected ? "bg-white" : p.dot)} />
                      {p.label}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Due date filter */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-[var(--landing-muted)] uppercase tracking-wider block">
              Due Date
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: "All dates", value: "ALL" as DueFilterType },
                { label: "Overdue", value: "OVERDUE" as DueFilterType },
                { label: "Due Today", value: "DUE_TODAY" as DueFilterType },
                { label: "Has due date", value: "HAS_DUE" as DueFilterType },
              ].map((d) => {
                const isSelected = dueFilter === d.value;
                return (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setDueFilter(d.value)}
                    className={cn(
                      "px-3 py-2 rounded-md text-xs sm:text-sm text-left transition cursor-pointer flex items-center justify-between border font-medium",
                      isSelected
                        ? "bg-[var(--landing-orange)] text-white border-[var(--landing-orange)] shadow-xs"
                        : "bg-[var(--landing-panel-strong)] hover:bg-[var(--landing-line)]/60 text-[var(--landing-text)] border-[var(--landing-line)]"
                    )}
                  >
                    <span>{d.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
