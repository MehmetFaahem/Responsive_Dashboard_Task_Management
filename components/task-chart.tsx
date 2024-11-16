"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTaskStore } from "@/lib/store";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const PRIORITY_COLORS = {
  high: "#ef4444",
  medium: "#eab308",
  low: "#22c55e",
};

const STATUS_COLORS = {
  pending: "#3b82f6",
  completed: "#10b981",
};

export function TaskChart() {
  const { tasks } = useTaskStore();

  const priorityData = Object.entries(
    tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const statusData = Object.entries(
    tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Tasks by Priority</CardTitle>
          <CardDescription>
            Distribution of tasks by priority level
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%" className="relative">
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {priorityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      PRIORITY_COLORS[
                        entry.name as keyof typeof PRIORITY_COLORS
                      ]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            {priorityData.length === 0 && (
              <h1 className="text-center text-muted-foreground text-xl font-semibold text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                No tasks found. Please add some tasks to see the chart.
              </h1>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tasks by Status</CardTitle>
          <CardDescription>
            Distribution of tasks by completion status
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%" className="relative">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            {statusData.length === 0 && (
              <h1 className="text-center text-muted-foreground text-xl font-semibold text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                No tasks found. Please add some tasks to see the chart.
              </h1>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
