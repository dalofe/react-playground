import type { ReadonlyTask } from '../types/task';

type TaskProgressProps = {
  tasks: ReadonlyTask[];
};

export default function TaskProgress({ tasks }: TaskProgressProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-lg bg-gray-100 p-4 dark:bg-slate-700/60">
      {progress === 100 ? (
        <div className="font-semibold text-green-600 dark:text-green-400">
          🎉 All done!
        </div>
      ) : (
        <>
          <div className="text-gray-700 dark:text-gray-200">
            {completed} of {total} tasks completed ({progress}%)
          </div>
          <div className="h-2 mt-2 w-full rounded-full bg-gray-200 dark:bg-slate-600">
            <div
              className="h-2 rounded-full bg-green-500 dark:bg-green-400"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}
