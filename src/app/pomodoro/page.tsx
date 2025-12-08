"use client";

import { SessionIndicator } from "@/src/features/pomodoro/components/SessionIndicator";
import { SettingsPanel } from "@/src/features/pomodoro/components/SettingsPanel";
import { TimerControls } from "@/src/features/pomodoro/components/TimerControls";
import { TimerDisplay } from "@/src/features/pomodoro/components/TimerDisplay";
import { usePomodoro } from "@/src/features/pomodoro/hooks/usePomodoro";
import Link from "next/link";

export default function PomodoroPage() {
  const {
    timerState,
    settings,
    isLoaded,
    progress,
    start,
    pause,
    reset,
    skip,
    updateSettings,
    resetStats,
  } = usePomodoro();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="戻るアイコン"
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

          <SettingsPanel
            settings={settings}
            onUpdate={updateSettings}
            onResetStats={resetStats}
            isTimerRunning={timerState.status === "running"}
          />
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            ポモドーロタイマー
          </h1>

          {/* Timer Display */}
          <div className="mb-8">
            <TimerDisplay
              mode={timerState.mode}
              remainingSeconds={timerState.remainingSeconds}
              progress={progress}
            />
          </div>

          {/* Controls */}
          <div className="mb-8">
            <TimerControls
              status={timerState.status}
              onStart={start}
              onPause={pause}
              onReset={reset}
              onSkip={skip}
            />
          </div>

          {/* Session Indicator */}
          <div>
            <SessionIndicator
              completedPomodoros={timerState.completedPomodoros}
              longBreakInterval={settings.longBreakInterval}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            ポモドーロテクニックとは？
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            ポモドーロテクニックは、25分の集中作業と5分の休憩を繰り返す時間管理術です。
            4回の作業セッション後には、15分の長い休憩を取ります。
            この方法により、集中力を維持しながら効率的に作業を進めることができます。
          </p>
        </div>
      </div>
    </div>
  );
}
