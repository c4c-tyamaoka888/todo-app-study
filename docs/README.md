# Todo アプリ設計書

Spring Boot + Next.js を使用した Todo アプリケーションの設計資料です。
AI駆動開発を前提とした学習課題として使用します。

## 技術スタック

| レイヤー | 技術 |
|----------|------|
| バックエンド | Java 25 / Spring Boot 4.0 / Gradle / MySQL / Spring Data JPA |
| フロントエンド | Next.js 16 / App Router / Tailwind CSS + shadcn/ui / TanStack Query |

## ドキュメント一覧

| ドキュメント | 説明 |
|-------------|------|
| [機能一覧](./01-features.md) | アプリケーションの機能要件 |
| [API仕様書](./02-api-specification.md) | REST API のエンドポイント詳細 |
| [データベース設計](./03-database-design.md) | ER図・テーブル定義・DDL |
| [アーキテクチャ](./04-architecture.md) | パッケージ構成・クラス図・レイヤー構成 |
| [シーケンス図](./05-sequence-diagrams.md) | 各機能の処理フロー |
| [セットアップガイド](./06-setup-guide.md) | 開発環境の構築手順 |
| [学習ガイド](./07-learning-guide.md) | 学習のポイント・発展課題 |
| [VSCode設定ガイド](./08-vscode-settings.md) | エディタ設定・タスク・デバッグ構成の解説 |
| [環境構築手順書](./09-environment-setup.md) | 詳細なセットアップ手順とトラブルシューティング |

## 参考ドキュメント

- [Spring Boot 公式ドキュメント](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [shadcn/ui 公式](https://ui.shadcn.com/)
- [TanStack Query 公式](https://tanstack.com/query/latest)
- [React Hook Form 公式](https://react-hook-form.com/)
- [Zod 公式](https://zod.dev/)
