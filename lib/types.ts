export type Priority = 'high' | 'medium' | 'low';
export type Status = 'pending' | 'completed';

export interface Task {
  id: string;
  name: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}

export interface TaskFormData {
  name: string;
  priority: Priority;
  status: Status;
}