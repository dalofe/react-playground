import type { Task } from '../types/task';

type TaskFilterBarProps = {
  tasks: Task[],
  sort: "none" | "asc" | "desc";
  onSortChange: (value: "none" | "asc" | "desc") => void;
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
        <select value={sort} onChange={(e) => onSortChange(e.target.value as "none" | "asc" | "desc")}>
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
