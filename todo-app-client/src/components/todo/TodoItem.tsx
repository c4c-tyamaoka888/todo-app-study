"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateTodo, useDeleteTodo } from "@/hooks/useTodos";
import { TodoEditDialog } from "./TodoEditDialog";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleToggleComplete = async () => {
    await updateTodo.mutateAsync({
      id: todo.id,
      request: {
        title: todo.title,
        completed: !todo.completed,
      },
    });
  };

  const handleDelete = async () => {
    if (window.confirm("このタスクを削除しますか？")) {
      await deleteTodo.mutateAsync(todo.id);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggleComplete}
          disabled={updateTodo.isPending}
        />
        <span
          className={`flex-1 ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.title}
        </span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditOpen(true)}
            disabled={updateTodo.isPending}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={deleteTodo.isPending}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>

      <TodoEditDialog
        todo={todo}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
