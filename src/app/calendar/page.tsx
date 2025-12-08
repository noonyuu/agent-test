"use client";

import { CalendarGrid } from "@/features/calendar/components/CalendarGrid";
import { CalendarHeader } from "@/features/calendar/components/CalendarHeader";
import { EventModal } from "@/features/calendar/components/EventModal";
import { useCalendar } from "@/features/calendar/hooks/useCalendar";
import { useDragAndDrop } from "@/features/calendar/hooks/useDragAndDrop";
import Link from "next/link";

export default function CalendarPage() {
  const {
    currentDate,
    year,
    month,
    calendarDays,
    modalOpen,
    editingEvent,
    selectedDate,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    openAddEventModal,
    openEditEventModal,
    closeModal,
    addEvent,
    updateEvent,
    deleteEvent,
    moveEvent,
  } = useCalendar();

  const { dragState, handleDragStart, handleDragOver, handleDragEnd, handleDragLeave } =
    useDragAndDrop(moveEvent);

  const handleSaveEvent = (eventData: typeof editingEvent) => {
    if (eventData) {
      if (eventData.id) {
        updateEvent(eventData);
      } else {
        addEvent(eventData);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="戻る"
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">カレンダー</h1>
            <p className="text-gray-600 dark:text-gray-400">
              予定を管理できます。日付をクリックして予定を追加、ドラッグ&ドロップで移動できます。
            </p>
          </div>

          <CalendarHeader
            year={year}
            month={month}
            onPreviousMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
            onToday={goToToday}
          />

          <CalendarGrid
            calendarDays={calendarDays}
            onDayClick={openAddEventModal}
            onEventEdit={openEditEventModal}
            onEventDelete={deleteEvent}
            onEventDragStart={handleDragStart}
            onDayDragOver={handleDragOver}
            onDayDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            isDragging={dragState.isDragging}
            draggedEventId={dragState.draggedEvent?.id || null}
            dragOverDate={dragState.dragOverDate}
          />
        </div>

        <EventModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSave={handleSaveEvent}
          editingEvent={editingEvent}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}
