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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 items-center p-3 bg-gray-100 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <label className="mr-2 font-semibold text-sm text-gray-700">
            Filter:{' '}
          </label>
          <select
            className="border border-gray-300 rounded-md p-1 text-sm"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as FilterOptions)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="mr-2 font-semibold text-sm text-gray-700">
            Sort:
          </label>
          <select
            className="border border-gray-300 rounded-md p-1 text-sm"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOptions)}
          >
            <option value="none">None</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>
      <span className="ml-auto text-xs sm:text-sm text-right text-gray-600">
        Showing {numberOfVisibleTasks} / {tasks.length} tasks
      </span>
    </div>
  );
}
