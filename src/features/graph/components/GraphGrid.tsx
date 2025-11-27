import type { GraphDimensions } from "../types";

interface GraphGridProps {
  dimensions: GraphDimensions;
  xSteps: number;
  ySteps: number;
}

export function GraphGrid({ dimensions, xSteps, ySteps }: GraphGridProps) {
  const { width, height, padding } = dimensions;
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const xLines = Array.from({ length: xSteps + 1 }, (_, i) => {
    const x = padding.left + (graphWidth * i) / xSteps;
    return (
      <line
        key={`x-${i}`}
        x1={x}
        y1={padding.top}
        x2={x}
        y2={height - padding.bottom}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  });

  const yLines = Array.from({ length: ySteps + 1 }, (_, i) => {
    const y = padding.top + (graphHeight * i) / ySteps;
    return (
      <line
        key={`y-${i}`}
        x1={padding.left}
        y1={y}
        x2={width - padding.right}
        y2={y}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  });

  return (
    <g>
      {xLines}
      {yLines}
    </g>
  );
}
