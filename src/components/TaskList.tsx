import type { Dispatch, SetStateAction } from 'react';
import TaskProgress from './TaskProgress';
import TaskForm from './TaskForm';
import type { Task, TaskDraft } from '../types/task';
import Button from './Button';
import { PiCheckFatFill } from 'react-icons/pi';

interface TaskListProps {
  title: string;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  showCompleted?: boolean;
  onTaskToggle?: (task: Task) => void;
  emptyMessage?: string;
  onAddTask: (Task: TaskDraft) => void;
}

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
    <div
      className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-md
    dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="flex justify-between p-2">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
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
                className="flex items-center justify-between p-2 text-gray-800 dark:text-gray-100"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={
                      task.completed
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : ''
                    }
                  >
                    {task.title}
                  </span>
                  {task.completed && (
                    <span className="text-green-600 text-sm dark:text-green-400">
                      <PiCheckFatFill />
                    </span>
                  )}
                </div>

                <div>
                  <Button
                    className="mr-1"
                    variant={task.completed ? 'success' : 'primary'}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? 'Undo' : 'Done'}
                  </Button>
                  <Button variant="danger" onClick={() => deleteTask(task.id)}>
                    x
                  </Button>
                </div>
              </li>
            ))
        )}
      </ul>
      <div className="grid justify-items-center mt-3">
        <Button variant="warning" onClick={emptyList}>
          Clear all tasks
        </Button>
      </div>
    </div>
  );
}
