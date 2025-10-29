export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

// a task before it’s saved (maybe missing an id)
export type TaskDraft = Partial<Omit<Task, "id">>;

// a read-only representation (like in TaskList)
export type TaskView = Readonly<Pick<Task, "id" | "title" | "completed">>;

// a grouped collection of tasks
export type TaskCollection = Record<"pending" | "done", Task[]>;

export type ReadonlyTask = Readonly<Task>;

export type SortOptions = "none" | "asc" | "desc";

export type FilterOptions = "all" | "completed" | "pending";