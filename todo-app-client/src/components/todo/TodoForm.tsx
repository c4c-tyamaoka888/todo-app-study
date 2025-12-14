"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTodo } from "@/hooks/useTodos";
import { todoSchema, type TodoFormData } from "@/schemas/todo";

export function TodoForm() {
  const createTodo = useCreateTodo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: TodoFormData) => {
    try {
      await createTodo.mutateAsync(data);
      reset();
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1">
        <Input
          placeholder="新しいタスクを入力..."
          {...register("title")}
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "追加中..." : "追加"}
      </Button>
    </form>
  );
}
