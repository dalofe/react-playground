import type { Task } from "./TaskList";

type TaskProgressProps = {
    tasks: Task[];
}

export default function TaskProgress({ tasks }: TaskProgressProps) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            {progress === 100 ? <div className="text-green-600 font-semibold">🎉 All done!</div> : (
                <>
                    <div>{completed} of {total} tasks completed ({progress}%)</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </>
            )}
        </div>
    );
}