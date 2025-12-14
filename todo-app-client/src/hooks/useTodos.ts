"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from "@/types/todo";

const QUERY_KEY = ["todos"];

export function useTodos() {
  return useQuery<Todo[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<Todo[]>("/api/todos");
      return data;
    },
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateTodoRequest) => {
      const { data } = await api.post<Todo>("/api/todos", request);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, request }: { id: number; request: UpdateTodoRequest }) => {
      const { data } = await api.put<Todo>(`/api/todos/${id}`, request);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
