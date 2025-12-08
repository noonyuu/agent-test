"use client";

import { useMemo, useState } from "react";
import type { CalendarDay, CalendarEvent, EventModalData } from "../types";

function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevMonthLastDay = new Date(year, month, 0);

  const days: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get the day of week for the first day (0 = Sunday)
  const startDayOfWeek = firstDay.getDay();

  // Add previous month's days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay.getDate() - i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: date.getTime() === today.getTime(),
      events: [],
    });
  }

  // Add current month's days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.getTime() === today.getTime(),
      events: [],
    });
  }

  // Add next month's days to complete the grid
  const remainingDays = 42 - days.length; // 6 weeks * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: date.getTime() === today.getTime(),
      events: [],
    });
  }

  return days;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const days = generateCalendarDays(year, month);

    // Attach events to their respective days
    return days.map((day) => {
      const dateString = formatDate(day.date);
      const dayEvents = events.filter((event) => event.date === dateString);
      return {
        ...day,
        events: dayEvents,
      };
    });
  }, [year, month, events]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const openAddEventModal = (date: string) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setModalOpen(true);
  };

  const openEditEventModal = (event: CalendarEvent) => {
    setSelectedDate(event.date);
    setEditingEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const addEvent = (eventData: EventModalData) => {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: eventData.title,
      description: eventData.description,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      date: eventData.date,
    };

    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (eventData: EventModalData) => {
    if (!eventData.id) return;

    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventData.id
          ? {
              ...event,
              title: eventData.title,
              description: eventData.description,
              startTime: eventData.startTime,
              endTime: eventData.endTime,
              date: eventData.date,
            }
          : event
      )
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const moveEvent = (eventId: string, newDate: string) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, date: newDate } : event))
    );
  };

  return {
    currentDate,
    year,
    month,
    calendarDays,
    events,
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
  };
}
