"use client";

import { useEffect, useState } from "react";
import type { DataPoint, GraphData } from "../types";

// サンプルデータを生成
const generateSampleData = (): DataPoint[] => {
  const points: DataPoint[] = [];
  for (let i = 0; i <= 10; i++) {
    points.push({
      x: i,
      y: Math.sin(i * 0.5) * 50 + 100 + Math.random() * 20,
      label: `${i}`,
    });
  }
  return points;
};

export function useGraphData() {
  const [graphData, setGraphData] = useState<GraphData>({
    points: [],
    xLabel: "時間",
    yLabel: "値",
    title: "折れ線グラフ",
  });

  useEffect(() => {
    // 初期データをロード
    const points = generateSampleData();
    setGraphData((prev) => ({
      ...prev,
      points,
    }));
  }, []);

  return { graphData };
}
