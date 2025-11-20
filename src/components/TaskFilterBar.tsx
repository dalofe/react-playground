import type { Task, SortOptions, FilterOptions } from '../types/task';

type TaskFilterBarProps = {
  tasks: Task[];
  sort: SortOptions;
  onSortChange: (value: SortOptions) => void;
  filter: FilterOptions;
  onFilterChange: (value: FilterOptions) => void;
  numberOfVisibleTasks: number;
};

export function TaskFilterBar({
  tasks,
  sort,
  onSortChange,
  filter,
  onFilterChange,
  numberOfVisibleTasks,
}: TaskFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 
    sm:flex-row sm:items-center sm:p-4 sm:justify-between sm:gap-4 
    dark:border-slate-700 dark:bg-slate-800">
      {/* Left side: Filter + Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
        {/* Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Filter:
          </label>
          <select
            className="select-base"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as FilterOptions)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Sort:
          </label>
          <select
            className="select-base"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOptions)}
          >
            <option value="none">None</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* Right side: Task count */}
      <span className="text-rigth text-xs text-gray-600 sm:text-sm sm:ml-auto dark:text-gray-300">
        Showing {numberOfVisibleTasks} / {tasks.length} tasks
      </span>
    </div>
  );
}
