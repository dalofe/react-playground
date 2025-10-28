import type { Dispatch, SetStateAction } from 'react';
import type { Task } from '../types/task';

type TaskFilterBarProps = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export function TaskFilterBar({ tasks, setTasks }: TaskFilterBarProps) {
  function sortTasks(e: React.ChangeEvent<HTMLSelectElement>): void {
    const sortBy = e.target.value;
    const direction = sortBy === 'desc' ? -1 : 1;

    const sorted = [...tasks].sort((a, b) => {
      const comparisonResult = a.title.localeCompare(b.title, undefined, {
        sensitivity: 'base',
      });

      return comparisonResult * direction;
    });

    setTasks(sorted);
  }

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
        <select onChange={sortTasks}>
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
