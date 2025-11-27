"use client";

import { useMemo } from "react";
import { useLineAnimation } from "../hooks/useLineAnimation";
import type { DataPoint, GraphDimensions } from "../types";

interface LineChartProps {
  points: DataPoint[];
  dimensions: GraphDimensions;
  color?: string;
}

export function LineChart({ points, dimensions, color = "#3b82f6" }: LineChartProps) {
  const { progress } = useLineAnimation({ duration: 2000, delay: 300 });
  const { width, height, padding } = dimensions;
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const { pathData, totalLength, visiblePoints } = useMemo(() => {
    if (points.length === 0) {
      return { pathData: "", totalLength: 0, visiblePoints: [] };
    }

    // Y軸の最小・最大値を計算
    const yValues = points.map((p) => p.y);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    const yRange = maxY - minY || 1;

    // 座標をSVG空間に変換
    const svgPoints = points.map((point, i) => ({
      x: padding.left + (graphWidth * i) / (points.length - 1),
      y: padding.top + graphHeight - ((point.y - minY) / yRange) * graphHeight,
      original: point,
    }));

    // パスデータを生成
    let path = "";
    for (const [i, point] of svgPoints.entries()) {
      if (i === 0) {
        path += `M ${point.x} ${point.y}`;
      } else {
        path += ` L ${point.x} ${point.y}`;
      }
    }

    // アニメーション進捗に基づいて表示するポイント数を計算
    const visibleCount = Math.floor(points.length * progress);
    const visible = svgPoints.slice(0, Math.max(1, visibleCount));

    // パスの長さを概算（実際の長さ計算のため）
    let length = 0;
    for (let i = 1; i < svgPoints.length; i++) {
      const dx = svgPoints[i].x - svgPoints[i - 1].x;
      const dy = svgPoints[i].y - svgPoints[i - 1].y;
      length += Math.sqrt(dx * dx + dy * dy);
    }

    return {
      pathData: path,
      totalLength: length,
      visiblePoints: visible,
    };
  }, [points, padding, graphWidth, graphHeight, progress]);

  if (points.length === 0) return null;

  // アニメーション用のstrokeDasharray
  const dashLength = totalLength * progress;

  return (
    <g aria-label="折れ線グラフ">
      {/* 折れ線 */}
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${dashLength} ${totalLength}`}
      />

      {/* データポイント */}
      {visiblePoints.map((point, i) => (
        <circle
          key={`point-${i}`}
          cx={point.x}
          cy={point.y}
          r="5"
          fill={color}
          stroke="white"
          strokeWidth="2"
          className="transition-opacity duration-300"
          style={{
            opacity: i === visiblePoints.length - 1 && progress < 1 ? 0.5 : 1,
          }}
        />
      ))}
    </g>
  );
}
