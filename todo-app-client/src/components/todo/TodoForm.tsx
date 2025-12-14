"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCreateTodo } from "@/hooks/useTodos";
import { todoSchema, type TodoFormData } from "@/schemas/todo";

export function TodoForm() {
  const form = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
    },
  });

  const createTodo = useCreateTodo();

  const onSubmit = (data: TodoFormData) => {
    createTodo.mutate(data, {
      onSuccess: () => {
        form.reset({ title: "" });
      },
      onError: (error) => {
        console.error("Failed to create todo:", error);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="新しいタスクを入力..."
                  disabled={createTodo.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createTodo.isPending}>
          {createTodo.isPending ? "追加中..." : "追加"}
        </Button>
      </form>
    </Form>
  );
}
