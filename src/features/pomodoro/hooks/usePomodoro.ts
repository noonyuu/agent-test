"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  PomodoroSettings,
  PomodoroSession,
  TimerMode,
  TimerState,
  TimerStatus,
} from "../types";
import { DEFAULT_SETTINGS } from "../types";

const STORAGE_KEY_SETTINGS = "pomodoro-settings";
const STORAGE_KEY_STATE = "pomodoro-state";

export function usePomodoro() {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [timerState, setTimerState] = useState<TimerState>({
    mode: "work",
    status: "idle",
    remainingSeconds: DEFAULT_SETTINGS.workDuration * 60,
    completedPomodoros: 0,
  });
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentSessionRef = useRef<PomodoroSession | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        setSettings(parsed);
        setTimerState((prev) => ({
          ...prev,
          remainingSeconds: parsed.workDuration * 60,
        }));
      }

      const storedState = localStorage.getItem(STORAGE_KEY_STATE);
      if (storedState) {
        const parsed = JSON.parse(storedState);
        setTimerState((prev) => ({
          ...prev,
          completedPomodoros: parsed.completedPomodoros || 0,
        }));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
      } catch (error) {
        console.error("Failed to save settings:", error);
      }
    }
  }, [settings, isLoaded]);

  // Save state to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(
          STORAGE_KEY_STATE,
          JSON.stringify({
            completedPomodoros: timerState.completedPomodoros,
          })
        );
      } catch (error) {
        console.error("Failed to save state:", error);
      }
    }
  }, [timerState.completedPomodoros, isLoaded]);

  // Play beep sound
  const playBeep = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const audioContext = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error("Failed to play beep:", error);
    }
  }, []);

  // Get duration for current mode
  const getDuration = useCallback(
    (mode: TimerMode): number => {
      switch (mode) {
        case "work":
          return settings.workDuration * 60;
        case "shortBreak":
          return settings.shortBreakDuration * 60;
        case "longBreak":
          return settings.longBreakDuration * 60;
      }
    },
    [settings]
  );

  // Get next mode
  const getNextMode = useCallback(
    (currentMode: TimerMode, completedPomodoros: number): TimerMode => {
      if (currentMode === "work") {
        // After work, check if it's time for long break
        if ((completedPomodoros + 1) % settings.longBreakInterval === 0) {
          return "longBreak";
        }
        return "shortBreak";
      }
      // After any break, go back to work
      return "work";
    },
    [settings.longBreakInterval]
  );

  // Complete session
  const completeSession = useCallback(() => {
    if (currentSessionRef.current) {
      const completedSession: PomodoroSession = {
        ...currentSessionRef.current,
        completedAt: Date.now(),
      };
      setSessions((prev) => [...prev, completedSession]);

      // Increment completed pomodoros only for work sessions
      if (currentSessionRef.current.mode === "work") {
        setTimerState((prev) => ({
          ...prev,
          completedPomodoros: prev.completedPomodoros + 1,
        }));
      }
    }
    currentSessionRef.current = null;
  }, []);

  // Timer tick
  useEffect(() => {
    if (timerState.status === "running") {
      intervalRef.current = setInterval(() => {
        setTimerState((prev) => {
          const newRemaining = prev.remainingSeconds - 1;

          if (newRemaining <= 0) {
            // Timer completed
            playBeep();
            completeSession();

            const nextMode = getNextMode(prev.mode, prev.completedPomodoros);
            const nextDuration = getDuration(nextMode);

            return {
              ...prev,
              mode: nextMode,
              status: "idle",
              remainingSeconds: nextDuration,
              completedPomodoros:
                prev.mode === "work" ? prev.completedPomodoros + 1 : prev.completedPomodoros,
            };
          }

          return {
            ...prev,
            remainingSeconds: newRemaining,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.status, playBeep, completeSession, getNextMode, getDuration]);

  // Start timer
  const start = useCallback(() => {
    if (timerState.status === "idle") {
      // Create new session
      currentSessionRef.current = {
        id: crypto.randomUUID(),
        mode: timerState.mode,
        startedAt: Date.now(),
      };
    }

    setTimerState((prev) => ({
      ...prev,
      status: "running",
    }));
  }, [timerState.status, timerState.mode]);

  // Pause timer
  const pause = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      status: "paused",
    }));
  }, []);

  // Reset timer
  const reset = useCallback(() => {
    if (currentSessionRef.current) {
      currentSessionRef.current = null;
    }

    setTimerState((prev) => ({
      ...prev,
      status: "idle",
      remainingSeconds: getDuration(prev.mode),
    }));
  }, [getDuration]);

  // Skip to next mode
  const skip = useCallback(() => {
    if (currentSessionRef.current) {
      completeSession();
    }

    setTimerState((prev) => {
      const nextMode = getNextMode(prev.mode, prev.completedPomodoros);
      const nextDuration = getDuration(nextMode);

      return {
        ...prev,
        mode: nextMode,
        status: "idle",
        remainingSeconds: nextDuration,
        completedPomodoros:
          prev.mode === "work" ? prev.completedPomodoros + 1 : prev.completedPomodoros,
      };
    });
  }, [completeSession, getNextMode, getDuration]);

  // Update settings
  const updateSettings = useCallback(
    (newSettings: PomodoroSettings) => {
      setSettings(newSettings);

      // If timer is idle, update remaining seconds
      if (timerState.status === "idle") {
        setTimerState((prev) => ({
          ...prev,
          remainingSeconds: getDuration(prev.mode),
        }));
      }
    },
    [timerState.status, getDuration]
  );

  // Reset all stats
  const resetStats = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      completedPomodoros: 0,
    }));
    setSessions([]);
    currentSessionRef.current = null;
  }, []);

  // Calculate progress percentage
  const progress = (timerState.remainingSeconds / getDuration(timerState.mode)) * 100;

  return {
    timerState,
    settings,
    sessions,
    isLoaded,
    progress,
    start,
    pause,
    reset,
    skip,
    updateSettings,
    resetStats,
  };
}
