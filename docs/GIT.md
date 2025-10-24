# Git管理方針

## Gitフロー

このプロジェクトでは、**Git Flow**を採用します。

### Git Flowとは

Git Flowは、Gitブランチモデルの一つで、以下のようなブランチ構成で開発を進めます：

- **main**: 本番環境にデプロイされる安定版ブランチ
- **claude/develop-{session-id}**: 開発用の統合ブランチ
- **claude/feature-{機能名}-{session-id}**: 新機能開発用ブランチ（claude/developから分岐）
- **claude/release-{バージョン}-{session-id}**: リリース準備用ブランチ（claude/developから分岐）
- **claude/hotfix-{修正内容}-{session-id}**: 緊急修正用ブランチ（mainから分岐）

### ブランチ命名規則

このプロジェクトでは、作業ブランチに `claude/` プレフィックスとセッションIDサフィックスが必要です：

- パターン: `claude/{type}-{description}-{session-id}`
- 例: `claude/feature-user-auth-011CUR1YvGRZhoZX9eNQHxac`
- 注意: セッションIDが一致しない場合、リモートへのpushが失敗します

### ブランチ運用ルール

1. **新機能開発**
   - `claude/develop-{session-id}`ブランチから`claude/feature-{機能名}-{session-id}`を作成
   - 開発完了後、`main`へPR作成・マージ（**各機能は完成後メインにマージする**）
   - **マージ後、機能ブランチは削除する**

2. **リリース準備**
   - `claude/develop-{session-id}`ブランチから`claude/release-{バージョン}-{session-id}`を作成
   - リリース準備完了後、`main`と`claude/develop-{session-id}`の両方にマージ
   - **マージ後、releaseブランチは削除する**

3. **緊急修正**
   - `main`ブランチから`claude/hotfix-{修正内容}-{session-id}`を作成
   - 修正完了後、`main`と`claude/develop-{session-id}`の両方にマージ
   - **マージ後、hotfixブランチは削除する**

### ブランチクリーンアップルール

**重要:** マージした後は機能ブランチを必ず削除すること

- **ローカルブランチの削除:**
  ```bash
  git branch -d claude/feature-xxx-{session-id}
  ```

- **リモートブランチの削除:**
  ```bash
  git push origin --delete claude/feature-xxx-{session-id}
  ```

- **理由:**
  - リポジトリをクリーンに保つ
  - 古いブランチによる混乱を防ぐ
  - どのブランチが現在アクティブかを明確にする

### 参考資料

- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
