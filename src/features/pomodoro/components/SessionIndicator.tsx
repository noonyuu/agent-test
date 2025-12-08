"use client";

interface SessionIndicatorProps {
  completedPomodoros: number;
  longBreakInterval: number;
}

export function SessionIndicator({ completedPomodoros, longBreakInterval }: SessionIndicatorProps) {
  const currentCycle = completedPomodoros % longBreakInterval;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          セッション進捗
        </h3>
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {completedPomodoros}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">完了したポモドーロ</div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {Array.from({ length: longBreakInterval }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              index < currentCycle
                ? "bg-red-500 text-white scale-110 shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            {index < currentCycle ? "✓" : index + 1}
          </div>
        ))}
      </div>

      <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
        {currentCycle === 0
          ? "新しいサイクルを開始しましょう"
          : `${longBreakInterval - currentCycle}個で大休憩`}
      </div>
    </div>
  );
}
