"use client";

import { Graph } from "@/features/graph/components/Graph";
import { useGraphData } from "@/features/graph/hooks/useGraphData";
import Link from "next/link";

export default function GraphPage() {
  const { graphData } = useGraphData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="戻るアイコン"
            >
              <title>戻る</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">折れ線グラフ</h1>
          <p className="text-gray-600">左から右にアニメーション表示される折れ線グラフです</p>
        </div>

        {/* グラフエリア */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Graph data={graphData} width={800} height={500} />
        </div>

        {/* 説明 */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">機能説明</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>独自実装のSVGベース折れ線グラフ（外部ライブラリ不使用）</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>左から右へスムーズにアニメーション表示</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>グリッド線と軸ラベル付き</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>データポイントの視覚化</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
