"use client";

import type { TimerStatus } from "../types";

interface TimerControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function TimerControls({ status, onStart, onPause, onReset, onSkip }: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Start/Pause button */}
      {status === "running" ? (
        <button
          onClick={onPause}
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          一時停止
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {status === "paused" ? "再開" : "開始"}
        </button>
      )}

      {/* Reset button */}
      {status !== "idle" && (
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          リセット
        </button>
      )}

      {/* Skip button */}
      <button
        onClick={onSkip}
        className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        スキップ
      </button>
    </div>
  );
}
