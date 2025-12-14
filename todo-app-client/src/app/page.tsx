"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoForm } from "@/components/todo/TodoForm";
import { TodoList } from "@/components/todo/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <main className="container mx-auto max-w-2xl px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Todo App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TodoForm />
            <TodoList />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
