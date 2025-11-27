# プロジェクトIssue管理

このドキュメントは、プロジェクトで計画されているIssueを管理します。
GitHub UIで以下の内容でIssueを作成してください。

## Issue #1: Next.jsプロジェクトのセットアップ

**Title:** Next.jsプロジェクトのセットアップ
**Labels:** `setup`, `enhancement`

### 機能

Next.js、TypeScript、Tailwind CSS、BiomeでBulletproof-React構成のプロジェクトを初期化する

### 詳細

- Next.js 14+ (App Router) のインストール
- TypeScript設定
- Biome（lint & format）の設定
- Tailwind CSSの設定
- Bulletproof-Reactのディレクトリ構造作成
  - `src/features/` - 機能別フォルダ
  - 各featureに `api/`, `components/`, `hooks/`, `types/`, `utils/` を配置
  - `src/app/` - Next.js App Router
  - `src/components/` - 共有コンポーネント
  - `src/lib/` - 共有ユーティリティ
  - `src/types/` - 共有型定義
- ホーム画面の実装（各サービスへのナビゲーション）

**Branch:** `claude/feature-project-setup-011CUR1YvGRZhoZX9eNQHxac`

---

## Issue #2: TodoList機能の実装

**Title:** TodoList機能の実装
**Labels:** `feature`

### 機能

タスクの追加・削除・完了管理ができるTodoList機能

### 詳細

- タスクの追加
- タスクの削除
- タスクの完了/未完了切り替え
- タスクリストの表示
- ローカルストレージでの永続化
- Bulletproof-React構成での実装
  - `src/features/todo/` に配置
  - コンポーネント、hooks、types を適切に分離

**Branch:** `claude/feature-todolist-011CUR1YvGRZhoZX9eNQHxac`

---

## Issue #3: 電卓機能の実装

**Title:** 電卓機能の実装
**Labels:** `feature`

### 機能

基本的な四則演算ができる電卓機能

### 詳細

- 数字入力（0-9）
- 四則演算（+, -, ×, ÷）
- クリア機能（C/AC）
- イコール（=）で計算実行
- 計算結果表示
- 小数点対応
- Bulletproof-React構成での実装
  - `src/features/calculator/` に配置
  - コンポーネント、hooks、types を適切に分離

**Branch:** `claude/feature-calculator-011CUR1YvGRZhoZX9eNQHxac`

---

## Issue #4: 折れ線グラフ機能の実装

**Title:** 折れ線グラフ機能の実装
**Labels:** `feature`

### 機能

左から右にアニメーション表示される独自の折れ線グラフ機能

### 詳細

- SVGを使用した独自の折れ線グラフ実装（外部ライブラリは使用しない）
- データポイントの表示
- 滑らかな折れ線の描画
- 左から右へのアニメーション効果
- グリッドとラベルの表示
- レスポンシブデザイン
- Bulletproof-React構成での実装
  - `src/features/graph/` に配置
  - コンポーネント、hooks、types を適切に分離

**Branch:** `claude/feature-graph-011CUR1YvGRZhoZX9eNQHxac`

---

## 開発の流れ

1. GitHub UIで上記のIssueを作成
2. 対応するブランチで実装
3. 実装完了後、PRを作成（base: `claude/develop-011CUR1YvGRZhoZX9eNQHxac`）
4. レビュー・承認後、マージ
