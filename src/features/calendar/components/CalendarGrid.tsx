import type { CalendarDay, CalendarEvent as CalendarEventType } from "../types";
import { CalendarEvent } from "./CalendarEvent";

interface CalendarGridProps {
  calendarDays: CalendarDay[];
  onDayClick: (date: string) => void;
  onEventEdit: (event: CalendarEventType) => void;
  onEventDelete: (eventId: string) => void;
  onEventDragStart: (event: CalendarEventType) => void;
  onDayDragOver: (date: string) => void;
  onDayDragLeave: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
  draggedEventId: string | null;
  dragOverDate: string | null;
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function CalendarGrid({
  calendarDays,
  onDayClick,
  onEventEdit,
  onEventDelete,
  onEventDragStart,
  onDayDragOver,
  onDayDragLeave,
  onDragEnd,
  isDragging,
  draggedEventId,
  dragOverDate,
}: CalendarGridProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-700">
        {WEEKDAYS.map((day, index) => (
          <div
            key={day}
            className={`
              text-center py-3 font-semibold text-sm
              ${index === 0 ? "text-red-600 dark:text-red-400" : ""}
              ${index === 6 ? "text-blue-600 dark:text-blue-400" : ""}
              ${index !== 0 && index !== 6 ? "text-gray-700 dark:text-gray-300" : ""}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 border-t border-gray-200 dark:border-gray-700">
        {calendarDays.map((day) => {
          const dateString = formatDate(day.date);
          const isDragOver = dragOverDate === dateString;

          return (
            <button
              key={dateString}
              type="button"
              className={`
                min-h-[120px] border-r border-b border-gray-200 dark:border-gray-700
                p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                ${!day.isCurrentMonth ? "bg-gray-50 dark:bg-gray-900/50" : ""}
                ${day.isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                ${isDragOver ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500" : ""}
              `}
              onClick={() => onDayClick(dateString)}
              onDragOver={(e) => {
                e.preventDefault();
                onDayDragOver(dateString);
              }}
              onDragLeave={onDayDragLeave}
              onDrop={(e) => {
                e.preventDefault();
                onDragEnd();
              }}
            >
              <div
                className={`
                  text-right font-semibold mb-1
                  ${!day.isCurrentMonth ? "text-gray-400 dark:text-gray-600" : "text-gray-700 dark:text-gray-300"}
                  ${day.isToday ? "text-blue-600 dark:text-blue-400" : ""}
                `}
              >
                {day.date.getDate()}
              </div>

              <div className="space-y-1">
                {day.events.map((event) => (
                  <CalendarEvent
                    key={event.id}
                    event={event}
                    onEdit={onEventEdit}
                    onDelete={onEventDelete}
                    onDragStart={onEventDragStart}
                    isDragging={isDragging && draggedEventId === event.id}
                  />
                ))}
              </div>

              {isDragOver && isDragging && (
                <div className="text-center text-green-600 dark:text-green-400 text-xs font-semibold mt-2">
                  ここに移動
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
