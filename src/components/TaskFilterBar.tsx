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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 rounded-lg border border-gray-200">
      {/* Left side: Filter + Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
        {/* Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="font-semibold text-sm text-gray-700">Filter:</label>
          <select
            className="flex-grow sm:flex-grow-0 sm:min-w-[140px] border border-gray-300 rounded-md p-1 text-sm bg-white hover:border-gray-400 focus:outlite-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
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
          <label className="font-semibold text-sm text-gray-700">Sort:</label>
          <select
            className="flex-grow sm:flex-grow-0 sm:min-w-[140px] border border-gray-300 rounded-md p-1 text-sm bg-white hover:border-gray-400 focus:outlite-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
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
      <span className="text-xs sm:text-sm text-right text-gray-600 sm:ml-auto">
        Showing {numberOfVisibleTasks} / {tasks.length} tasks
      </span>
    </div>
  );
}
