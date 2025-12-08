export type TimerMode = "work" | "shortBreak" | "longBreak";

export type TimerStatus = "idle" | "running" | "paused";

export interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  remainingSeconds: number;
  completedPomodoros: number;
}

export interface PomodoroSettings {
  workDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  longBreakInterval: number; // number of pomodoros before long break
}

export interface PomodoroSession {
  id: string;
  mode: TimerMode;
  startedAt: number;
  completedAt?: number;
}

export const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
};
