import type { DataPoint, GraphDimensions } from "../types";

interface GraphAxesProps {
  dimensions: GraphDimensions;
  points: DataPoint[];
  xLabel?: string;
  yLabel?: string;
}

export function GraphAxes({ dimensions, points, xLabel, yLabel }: GraphAxesProps) {
  const { width, height, padding } = dimensions;
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  if (points.length === 0) return null;

  // Y軸の最小・最大値を計算
  const yValues = points.map((p) => p.y);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const yRange = maxY - minY;

  // Y軸ラベル（5段階）
  const yLabels = Array.from({ length: 5 }, (_, i) => {
    const value = maxY - (yRange * i) / 4;
    const y = padding.top + (graphHeight * i) / 4;
    return (
      <text
        key={`y-label-${i}`}
        x={padding.left - 10}
        y={y}
        textAnchor="end"
        alignmentBaseline="middle"
        className="text-xs fill-gray-600"
      >
        {Math.round(value)}
      </text>
    );
  });

  // X軸ラベル
  const xLabels = points.map((point, i) => {
    const x = padding.left + (graphWidth * i) / (points.length - 1);
    return (
      <text
        key={`x-label-${i}`}
        x={x}
        y={height - padding.bottom + 20}
        textAnchor="middle"
        className="text-xs fill-gray-600"
      >
        {point.label || point.x}
      </text>
    );
  });

  return (
    <g aria-label="グラフ軸">
      {/* 軸線 */}
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={height - padding.bottom}
        stroke="#374151"
        strokeWidth="2"
      />
      <line
        x1={padding.left}
        y1={height - padding.bottom}
        x2={width - padding.right}
        y2={height - padding.bottom}
        stroke="#374151"
        strokeWidth="2"
      />

      {/* Y軸ラベル */}
      {yLabels}

      {/* X軸ラベル */}
      {xLabels}

      {/* 軸タイトル */}
      {yLabel && (
        <text
          x={padding.left - 50}
          y={height / 2}
          textAnchor="middle"
          className="text-sm fill-gray-700 font-semibold"
          transform={`rotate(-90, ${padding.left - 50}, ${height / 2})`}
        >
          {yLabel}
        </text>
      )}
      {xLabel && (
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="text-sm fill-gray-700 font-semibold"
        >
          {xLabel}
        </text>
      )}
    </g>
  );
}
