export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

// a task before it’s saved (maybe missing an id)
export type TaskDraft = Partial<Omit<Task, "id">>;

export type ReadonlyTask = Readonly<Task>;

export type SortOptions = "none" | "asc" | "desc";

export type FilterOptions = "all" | "completed" | "pending";