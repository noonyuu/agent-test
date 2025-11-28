"use client";

import type { GraphData } from "../types";
import { GraphAxes } from "./GraphAxes";
import { GraphGrid } from "./GraphGrid";
import { LineChart } from "./LineChart";

interface GraphProps {
  data: GraphData;
  width?: number;
  height?: number;
}

export function Graph({ data, width = 800, height = 500 }: GraphProps) {
  const dimensions = {
    width,
    height,
    padding: {
      top: 40,
      right: 40,
      bottom: 60,
      left: 70,
    },
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
        <svg
          width={width}
          height={height}
          className="mx-auto"
          role="img"
          aria-label={data.title || "折れ線グラフ"}
        >
          {/* タイトル */}
          {data.title && (
            <text
              x={width / 2}
              y={20}
              textAnchor="middle"
              className="text-lg fill-gray-800 font-bold"
            >
              {data.title}
            </text>
          )}

          {/* グリッド */}
          <GraphGrid dimensions={dimensions} xSteps={10} ySteps={5} />

          {/* 軸 */}
          <GraphAxes
            dimensions={dimensions}
            points={data.points}
            xLabel={data.xLabel}
            yLabel={data.yLabel}
          />

          {/* 折れ線 */}
          <LineChart points={data.points} dimensions={dimensions} />
        </svg>
      </div>
    </div>
  );
}
