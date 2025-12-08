"use client";

import { useState } from "react";
import type { CalendarEvent, DragState } from "../types";

export function useDragAndDrop(onEventMove: (eventId: string, newDate: string) => void) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedEvent: null,
    dragOverDate: null,
  });

  const handleDragStart = (event: CalendarEvent) => {
    setDragState({
      isDragging: true,
      draggedEvent: event,
      dragOverDate: null,
    });
  };

  const handleDragOver = (date: string) => {
    if (dragState.isDragging) {
      setDragState((prev) => ({
        ...prev,
        dragOverDate: date,
      }));
    }
  };

  const handleDragEnd = () => {
    if (dragState.draggedEvent && dragState.dragOverDate) {
      // Only move if the date is different
      if (dragState.draggedEvent.date !== dragState.dragOverDate) {
        onEventMove(dragState.draggedEvent.id, dragState.dragOverDate);
      }
    }

    setDragState({
      isDragging: false,
      draggedEvent: null,
      dragOverDate: null,
    });
  };

  const handleDragLeave = () => {
    setDragState((prev) => ({
      ...prev,
      dragOverDate: null,
    }));
  };

  return {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragLeave,
  };
}
