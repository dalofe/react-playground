import type { Dispatch, SetStateAction } from 'react';
import TaskProgress from './TaskProgress';
import TaskForm from './TaskForm';
import type { Task, TaskDraft } from '../types/task';

type TaskListProps = {
  title: string;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  showCompleted?: boolean;
  onTaskToggle?: (task: Task) => void;
  emptyMessage?: string;
  onAddTask: (Task: TaskDraft) => void;
};

export default function TaskList({
  title,
  tasks,
  setTasks,
  showCompleted = true,
  onTaskToggle,
  emptyMessage = 'All done here',
  onAddTask,
}: TaskListProps) {
  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const toggledTask = updatedTasks.find((task) => task.id === id);
    if (toggledTask && onTaskToggle) {
      onTaskToggle(toggledTask);
    }
  };

  const deleteTask = (id: number) => {
    const filteredTasksList = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasksList);
  };

  const emptyList = () => {
    if (window.confirm('Are you sure you want to clear all the tasks?')) {
      setTasks([]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <div className="flex justify-between p-2">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <TaskForm onAddTask={onAddTask} />
      </div>
      <TaskProgress tasks={tasks} />
      <ul>
        {tasks.length === 0 ? (
          <li className="p-2 text-gray-500 italic">{emptyMessage}</li>
        ) : (
          tasks
            //.filter(task => showCompleted ? true : !task.completed)
            .filter((task) => showCompleted || !task.completed)
            .map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-2 text-gray-800"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={
                      task.completed ? 'line-through text-gray-400' : ''
                    }
                  >
                    {task.title}
                  </span>
                  {task.completed && (
                    <span className="text-green-600 text-sm">✔</span>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="px-3 py-1 mr-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    {task.completed ? 'Undo' : 'Done'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    x
                  </button>
                </div>
              </li>
            ))
        )}
      </ul>
      <div className="grid justify-items-center mt-3">
        <button
          onClick={emptyList}
          className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300 transition"
        >
          Clear all tasks
        </button>
      </div>
    </div>
  );
}
