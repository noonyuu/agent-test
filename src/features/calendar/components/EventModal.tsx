"use client";

import { useEffect, useState } from "react";
import type { CalendarEvent, EventModalData } from "../types";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: EventModalData) => void;
  editingEvent: CalendarEvent | null;
  selectedDate: string | null;
}

export function EventModal({
  isOpen,
  onClose,
  onSave,
  editingEvent,
  selectedDate,
}: EventModalProps) {
  const [formData, setFormData] = useState<EventModalData>({
    title: "",
    description: "",
    startTime: "09:00",
    endTime: "10:00",
    date: "",
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        id: editingEvent.id,
        title: editingEvent.title,
        description: editingEvent.description,
        startTime: editingEvent.startTime,
        endTime: editingEvent.endTime,
        date: editingEvent.date,
      });
    } else if (selectedDate) {
      setFormData({
        title: "",
        description: "",
        startTime: "09:00",
        endTime: "10:00",
        date: selectedDate,
      });
    }
  }, [editingEvent, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {editingEvent ? "予定を編集" : "新しい予定"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                タイトル *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="予定のタイトル"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                説明
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="詳細な説明"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                日付 *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  開始時刻 *
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  終了時刻 *
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {editingEvent ? "更新" : "追加"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
