export type TaskStatus =
  | 'PENDING'
  | 'ASSIGNED'
  | 'COMPLETED';

export type TaskCategory =
  | 'PERSONAL'
  | 'TRABAJO'
  | 'ESTUDIO'
  | 'OTROS';

export interface Task {
  id: number;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  createdAt: Date;
  swiped?: boolean;
}