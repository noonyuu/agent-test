import type { CalendarEvent as CalendarEventType } from "../types";

interface CalendarEventProps {
  event: CalendarEventType;
  onEdit: (event: CalendarEventType) => void;
  onDelete: (eventId: string) => void;
  onDragStart: (event: CalendarEventType) => void;
  isDragging: boolean;
}

export function CalendarEvent({
  event,
  onEdit,
  onDelete,
  onDragStart,
  isDragging,
}: CalendarEventProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    onDragStart(event);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(event);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(event.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`
        group relative bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500
        rounded px-2 py-1 mb-1 cursor-move hover:bg-blue-200 dark:hover:bg-blue-800
        transition-colors text-xs
        ${isDragging ? "opacity-50" : "opacity-100"}
      `}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-800 dark:text-gray-100 truncate">
            {event.title}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-[10px]">
            {event.startTime} - {event.endTime}
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={handleEdit}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-1"
            aria-label="編集"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="編集"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 p-1"
            aria-label="削除"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="削除"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
