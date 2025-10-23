# Git管理方針

## Gitフロー

このプロジェクトでは、**Git Flow**を採用します。

### Git Flowとは

Git Flowは、Gitブランチモデルの一つで、以下のようなブランチ構成で開発を進めます：

- **main/master**: 本番環境にデプロイされる安定版ブランチ
- **develop**: 開発用の統合ブランチ
- **feature/**: 新機能開発用ブランチ（developから分岐）
- **release/**: リリース準備用ブランチ（developから分岐）
- **hotfix/**: 緊急修正用ブランチ（mainから分岐）

### ブランチ運用ルール

1. **新機能開発**
   - `develop`ブランチから`feature/機能名`を作成
   - 開発完了後、`develop`にマージ

2. **リリース準備**
   - `develop`ブランチから`release/バージョン`を作成
   - リリース準備完了後、`main`と`develop`の両方にマージ

3. **緊急修正**
   - `main`ブランチから`hotfix/修正内容`を作成
   - 修正完了後、`main`と`develop`の両方にマージ

### 参考資料

- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
