export interface TaskState {
  task_name: string;
  task_description: string;
  task_status: 'pending' | 'done' | undefined;
}

export interface TaskAssignment {
  assignToUser: string;
  author: string;
  tasks: TaskState[];
  id: number;
  listNameToUser: string;
}

export interface UserTasksList {
  assignedTo: string;
  tasks_list: TaskAssignment[];
  id: number;
  first_name: string;
}
