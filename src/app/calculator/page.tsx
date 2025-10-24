"use client";

import { CalculatorButton } from "@/src/features/calculator/components/CalculatorButton";
import { CalculatorDisplay } from "@/src/features/calculator/components/CalculatorDisplay";
import { useCalculator } from "@/src/features/calculator/hooks/useCalculator";
import Link from "next/link";

export default function CalculatorPage() {
  const { display, inputDigit, inputDecimal, clearDisplay, performOperation, performEquals } =
    useCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            🔢 電卓
          </h1>

          <CalculatorDisplay value={display} />

          <div className="grid grid-cols-4 gap-3">
            <CalculatorButton value="C" onClick={clearDisplay} variant="clear" />
            <CalculatorButton value="÷" onClick={() => performOperation("÷")} variant="operator" />
            <CalculatorButton value="×" onClick={() => performOperation("×")} variant="operator" />
            <CalculatorButton value="-" onClick={() => performOperation("-")} variant="operator" />

            <CalculatorButton value="7" onClick={() => inputDigit("7")} />
            <CalculatorButton value="8" onClick={() => inputDigit("8")} />
            <CalculatorButton value="9" onClick={() => inputDigit("9")} />
            <CalculatorButton value="+" onClick={() => performOperation("+")} variant="operator" />

            <CalculatorButton value="4" onClick={() => inputDigit("4")} />
            <CalculatorButton value="5" onClick={() => inputDigit("5")} />
            <CalculatorButton value="6" onClick={() => inputDigit("6")} />
            <CalculatorButton value="=" onClick={performEquals} variant="equals" />

            <CalculatorButton value="1" onClick={() => inputDigit("1")} />
            <CalculatorButton value="2" onClick={() => inputDigit("2")} />
            <CalculatorButton value="3" onClick={() => inputDigit("3")} />
            <CalculatorButton value="0" onClick={() => inputDigit("0")} span={2} />
            <CalculatorButton value="." onClick={inputDecimal} />
          </div>
        </div>
      </div>
    </div>
  );
}
