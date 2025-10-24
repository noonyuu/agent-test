"use client";

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
  variant?: "default" | "operator" | "equals" | "clear";
  span?: 1 | 2;
}

const variantStyles = {
  default:
    "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white",
  operator: "bg-orange-500 hover:bg-orange-600 text-white",
  equals: "bg-blue-600 hover:bg-blue-700 text-white",
  clear: "bg-red-500 hover:bg-red-600 text-white",
};

export function CalculatorButton({
  value,
  onClick,
  variant = "default",
  span = 1,
}: CalculatorButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${variantStyles[variant]}
        ${span === 2 ? "col-span-2" : ""}
        p-6 text-2xl font-semibold rounded-xl shadow-md transition-all duration-150 active:scale-95
      `}
    >
      {value}
    </button>
  );
}
