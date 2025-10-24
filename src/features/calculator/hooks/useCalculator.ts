"use client";

import { useState } from "react";
import type { CalculatorState, Operator } from "../types";

const initialState: CalculatorState = {
  display: "0",
  previousValue: null,
  operator: null,
  waitingForOperand: false,
};

function calculate(a: number, b: number, operator: Operator): number {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b !== 0 ? a / b : 0;
    default:
      return b;
  }
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const inputDigit = (digit: string) => {
    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: digit,
          waitingForOperand: false,
        };
      }

      const newDisplay = prev.display === "0" ? digit : prev.display + digit;

      return {
        ...prev,
        display: newDisplay,
      };
    });
  };

  const inputDecimal = () => {
    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: "0.",
          waitingForOperand: false,
        };
      }

      if (prev.display.includes(".")) {
        return prev;
      }

      return {
        ...prev,
        display: `${prev.display}.`,
      };
    });
  };

  const clearDisplay = () => {
    setState(initialState);
  };

  const performOperation = (nextOperator: Operator) => {
    setState((prev) => {
      const inputValue = Number.parseFloat(prev.display);

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: inputValue,
          operator: nextOperator,
          waitingForOperand: true,
        };
      }

      if (prev.operator) {
        const currentValue = prev.previousValue || 0;
        const newValue = calculate(currentValue, inputValue, prev.operator);

        return {
          ...prev,
          display: String(newValue),
          previousValue: newValue,
          operator: nextOperator,
          waitingForOperand: true,
        };
      }

      return prev;
    });
  };

  const performEquals = () => {
    setState((prev) => {
      const inputValue = Number.parseFloat(prev.display);

      if (prev.previousValue !== null && prev.operator) {
        const newValue = calculate(prev.previousValue, inputValue, prev.operator);

        return {
          ...initialState,
          display: String(newValue),
        };
      }

      return prev;
    });
  };

  return {
    display: state.display,
    inputDigit,
    inputDecimal,
    clearDisplay,
    performOperation,
    performEquals,
  };
}
