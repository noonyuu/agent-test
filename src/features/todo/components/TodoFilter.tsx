"use client";

import type { TodoFilter as FilterType } from "../types";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "active", label: "未完了" },
  { value: "completed", label: "完了" },
];

export function TodoFilter({
  currentFilter,
  onFilterChange,
  stats,
  onClearCompleted,
}: TodoFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              currentFilter === filter.value
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {stats.active} / {stats.total} タスク
        </span>
        {stats.completed > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            完了済みを削除
          </button>
        )}
      </div>
    </div>
  );
}
