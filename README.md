# Todo App Study

Spring Boot + Next.js を使用した Todo アプリケーションです。
AI駆動開発を前提とした学習課題として作成されました。

## 技術スタック

| レイヤー | 技術 |
|----------|------|
| バックエンド | Java 25 / Spring Boot 4.0 / Gradle / Spring Data JPA |
| フロントエンド | Next.js 16 / TypeScript / Tailwind CSS / shadcn/ui / TanStack Query |
| データベース | MySQL 8.0 |
| インフラ | Docker / Docker Compose |

## クイックスタート

### 前提条件

- Docker Desktop
- Node.js 20.x 以上

### 起動手順

```bash
# バックエンド起動（MySQL + Spring Boot）
docker compose up -d --build

# フロントエンド起動
cd todo-app-client
npm install
npm run dev
```

### アクセス

- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:8080/api/todos

## プロジェクト構成

```
todo-app-study/
├── todo-app-server/     # Spring Boot バックエンド
├── todo-app-client/     # Next.js フロントエンド
├── docker/              # Docker 関連ファイル
├── docs/                # ドキュメント
└── .vscode/             # VSCode 設定
```

## ドキュメント

詳細なドキュメントは [docs/README.md](./docs/README.md) を参照してください。

- [機能一覧](./docs/01-features.md)
- [API仕様書](./docs/02-api-specification.md)
- [データベース設計](./docs/03-database-design.md)
- [アーキテクチャ](./docs/04-architecture.md)
- [環境構築手順書](./docs/09-environment-setup.md)
- [VSCode設定ガイド](./docs/08-vscode-settings.md)

## 開発

### バックエンドのデバッグ

Docker コンテナでリモートデバッグが可能です（ポート 5005）。
VSCode の「実行とデバッグ」から「Docker - リモートデバッグ」を選択してください。

### 停止

```bash
# フロントエンド: Ctrl + C

# バックエンド
docker compose down
```

## ライセンス

このプロジェクトは学習目的で作成されています。
