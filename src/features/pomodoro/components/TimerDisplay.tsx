"use client";

import type { TimerMode } from "../types";

interface TimerDisplayProps {
  mode: TimerMode;
  remainingSeconds: number;
  progress: number;
}

export function TimerDisplay({ mode, remainingSeconds, progress }: TimerDisplayProps) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const getModeColor = (mode: TimerMode): string => {
    switch (mode) {
      case "work":
        return "text-red-500";
      case "shortBreak":
      case "longBreak":
        return "text-green-500";
    }
  };

  const getModeLabel = (mode: TimerMode): string => {
    switch (mode) {
      case "work":
        return "作業中";
      case "shortBreak":
        return "小休憩";
      case "longBreak":
        return "大休憩";
    }
  };

  const getStrokeColor = (mode: TimerMode): string => {
    switch (mode) {
      case "work":
        return "stroke-red-500";
      case "shortBreak":
      case "longBreak":
        return "stroke-green-500";
    }
  };

  // SVG circle parameters
  const size = 300;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${getStrokeColor(mode)} transition-all duration-1000 ease-linear`}
          />
        </svg>

        {/* Timer text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-6xl font-bold ${getModeColor(mode)} font-mono`}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <div className="text-lg font-medium text-gray-600 dark:text-gray-400 mt-2">
            {getModeLabel(mode)}
          </div>
        </div>
      </div>
    </div>
  );
}
