"use client";

import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { TaskChart } from "@/components/task-chart";
import { useTaskStore } from "@/lib/store";
import { ModeToggle } from "@/components/mode-toggle";
import { ClipboardList } from "lucide-react";

export default function Home() {
  const { addTask } = useTaskStore();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border mx-auto max-w-screen-xl">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6" />
            <h1 className="text-xl font-semibold">
              Soft Minion Task Dashboard
            </h1>
          </div>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-screen-xl mx-auto">
        <div className="grid gap-8">
          <div className="grid gap-8 md:grid-cols-[350px,1fr]">
            <div>
              <div className="sticky top-8">
                <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
                <TaskForm onSubmit={addTask} />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Task List</h2>
              <TaskList />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Task Analytics (Pie Chart)
            </h2>
            <TaskChart />
          </div>
        </div>
      </main>
    </div>
  );
}
