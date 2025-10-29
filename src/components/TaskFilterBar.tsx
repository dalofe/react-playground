import type { Task, SortOptions } from '../types/task';

type TaskFilterBarProps = {
  tasks: Task[],
  sort: SortOptions;
  onSortChange: (value: SortOptions) => void;
};

export function TaskFilterBar({ tasks, sort, onSortChange }: TaskFilterBarProps) {
  

  return (
    <div className="flex gap-4 items-center p-3 bg-gray-100 rounded-lg">
      <div>
        <label className="mr-2 font-semibold">Filter: </label>
        <select>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div>
        <label className="mr-2 font-semibold">Sort:</label>
        <select value={sort} onChange={(e) => onSortChange(e.target.value as SortOptions)}>
          <option value="none">None</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <span className="ml-auto text-sm text-gray-600">
        Showing X / {tasks.length} tasks
      </span>
    </div>
  );
}
