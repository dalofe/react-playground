import type { Task, SortOptions, FilterOptions } from '../types/task';
import { Select } from './Select';

interface TaskFilterBarProps {
  tasks: Task[];
  sort: SortOptions;
  onSortChange: (value: SortOptions) => void;
  filter: FilterOptions;
  onFilterChange: (value: FilterOptions) => void;
  numberOfVisibleTasks: number;
}

export function TaskFilterBar({
  tasks,
  sort,
  onSortChange,
  filter,
  onFilterChange,
  numberOfVisibleTasks,
}: TaskFilterBarProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 
    sm:flex-row sm:items-center sm:p-4 sm:justify-between sm:gap-4 
    dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Left side: Filter + Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
        {/* Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            label="Filter:"
            value={filter}
            onChange={(v) => onFilterChange(v as FilterOptions)}
            options={[
              { value: 'all', label: 'All' },
              { value: 'completed', label: 'Completed' },
              { value: 'pending', label: 'Pending' },
            ]}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            label="Sort:"
            value={sort}
            onChange={(v) => onSortChange(v as SortOptions)}
            options={[
              { value: 'none', label: 'None' },
              { value: 'asc', label: 'A-Z' },
              { value: 'desc', label: 'Z-A' },
            ]}
          />
        </div>
      </div>

      {/* Right side: Task count */}
      <span className="text-rigth text-xs text-gray-600 sm:text-sm sm:ml-auto dark:text-gray-300">
        Showing {numberOfVisibleTasks} / {tasks.length} tasks
      </span>
    </div>
  );
}
