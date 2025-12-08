export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string; // ISO date string (YYYY-MM-DD)
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface EventModalData {
  id?: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
}

export interface DragState {
  isDragging: boolean;
  draggedEvent: CalendarEvent | null;
  dragOverDate: string | null;
}
