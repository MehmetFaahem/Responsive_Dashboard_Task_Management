"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskForm } from "@/components/task-form";
import { Priority, Status, Task } from "@/lib/types";
import { useTaskStore } from "@/lib/store";
import { format } from "date-fns";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const priorityColors = {
  high: "text-red-500 bg-red-100 dark:bg-red-950",
  medium: "text-yellow-500 bg-yellow-100 dark:bg-yellow-950",
  low: "text-green-500 bg-green-100 dark:bg-green-950",
};

export function TaskList() {
  const [selectedPriority, setSelectedPriority] = useState<Priority | "all">(
    "all"
  );
  const [selectedStatus, setSelectedStatus] = useState<Status | "all">("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { tasks, updateTask, deleteTask, toggleStatus } = useTaskStore();

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch =
      selectedPriority === "all" || task.priority === selectedPriority;
    const statusMatch =
      selectedStatus === "all" || task.status === selectedStatus;
    return priorityMatch && statusMatch;
  });

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
    toast.success("Task deleted successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          onValueChange={(value: Priority | "all") =>
            setSelectedPriority(value)
          }
          value={selectedPriority}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value: Status | "all") => setSelectedStatus(value)}
          value={selectedStatus}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => toggleStatus(task.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <span
                    className={
                      task.status === "completed"
                        ? "line-through opacity-50"
                        : ""
                    }
                  >
                    {task.name}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={priorityColors[task.priority]}
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(task.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingTask(task)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(task.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No tasks found. Please add some tasks to see the list.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <TaskForm
              initialData={editingTask}
              onSubmit={(data) => {
                updateTask(editingTask.id, data);
                setEditingTask(null);
              }}
              submitLabel="Update Task"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
