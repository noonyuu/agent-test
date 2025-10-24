"use client";

interface CalculatorDisplayProps {
  value: string;
}

export function CalculatorDisplay({ value }: CalculatorDisplayProps) {
  return (
    <div className="bg-gray-900 dark:bg-black text-white p-8 rounded-xl mb-4 shadow-inner">
      <div className="text-right text-5xl font-bold overflow-hidden break-words">{value}</div>
    </div>
  );
}
