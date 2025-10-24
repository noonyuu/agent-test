"use client";

import { TodoFilter } from "@/src/features/todo/components/TodoFilter";
import { TodoInput } from "@/src/features/todo/components/TodoInput";
import { TodoItem } from "@/src/features/todo/components/TodoItem";
import { useTodos } from "@/src/features/todo/hooks/useTodos";
import Link from "next/link";

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
    isLoaded,
  } = useTodos();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="戻るアイコン"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            ホームに戻る
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            ✓ TodoList
          </h1>

          <div className="space-y-6">
            <TodoInput onAdd={addTodo} />

            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              stats={stats}
              onClearCompleted={clearCompleted}
            />

            <div className="space-y-2">
              {todos.length === 0 ? (
                <div className="text-center py-12 text-gray-400 dark:text-gray-600">
                  {filter === "completed"
                    ? "完了したタスクはありません"
                    : filter === "active"
                      ? "未完了のタスクはありません"
                      : "タスクを追加してください"}
                </div>
              ) : (
                todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
