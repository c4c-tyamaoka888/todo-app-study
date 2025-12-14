"use client";

import { useTodos } from "@/hooks/useTodos";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">読み込み中...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        エラーが発生しました: {error.message}
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        タスクがありません。新しいタスクを追加してください。
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
