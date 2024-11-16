import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskFormData } from './types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: TaskFormData) => void;
  updateTask: (id: string, task: TaskFormData) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (taskData) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              ...taskData,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateTask: (id, taskData) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...taskData,
                }
              : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === 'pending' ? 'completed' : 'pending',
                }
              : task
          ),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);