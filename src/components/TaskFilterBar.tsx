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
    <div className="flex gap-4 items-center p-3 bg-gray-100 rounded-lg">
      <div>
        <label className="mr-2 font-semibold">Filter: </label>
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as FilterOptions)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div>
        <label className="mr-2 font-semibold">Sort:</label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOptions)}
        >
          <option value="none">None</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <span className="ml-auto text-sm text-gray-600">
        Showing {numberOfVisibleTasks} / {tasks.length} tasks
      </span>
    </div>
  );
}
