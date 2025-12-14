"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateTodo } from "@/hooks/useTodos";
import { todoUpdateSchema, type TodoUpdateFormData } from "@/schemas/todo";
import type { Todo } from "@/types/todo";

interface TodoEditDialogProps {
  todo: Todo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TodoEditDialog({
  todo,
  open,
  onOpenChange,
}: TodoEditDialogProps) {
  const updateTodo = useUpdateTodo();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TodoUpdateFormData>({
    resolver: zodResolver(todoUpdateSchema),
    defaultValues: {
      title: todo.title,
      completed: todo.completed,
    },
  });

  const completed = watch("completed");

  useEffect(() => {
    if (open) {
      reset({
        title: todo.title,
        completed: todo.completed,
      });
    }
  }, [open, todo, reset]);

  const onSubmit = async (data: TodoUpdateFormData) => {
    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        request: data,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>タスクを編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="タイトル"
              {...register("title")}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="completed"
              checked={completed}
              onCheckedChange={(checked) => setValue("completed", checked === true)}
              disabled={isSubmitting}
            />
            <label htmlFor="completed" className="text-sm cursor-pointer">
              完了
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "保存中..." : "保存"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
