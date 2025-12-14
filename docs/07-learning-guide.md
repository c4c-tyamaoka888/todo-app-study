# 学習ガイド

[← 目次に戻る](./README.md)

## バックエンド（Spring Boot）

### 1. レイヤードアーキテクチャの理解

| レイヤー | 役割 | クラス例 |
|----------|------|----------|
| Controller | HTTPリクエスト/レスポンスの処理 | TodoController |
| Service | ビジネスロジック | TodoServiceImpl |
| Repository | データアクセス | TodoRepository |
| Entity | データベースとのマッピング | Todo |

### 2. Spring Data JPA の基本

- `JpaRepository` の継承
- クエリメソッドの命名規則（例: `findAllByOrderByCreatedAtDesc`）

### 3. RESTful API 設計

- 適切な HTTP メソッドの使い分け（GET/POST/PUT/DELETE）
- ステータスコードの使い方（200/201/204/400/404）

### 4. 例外ハンドリング

- `@ControllerAdvice` による共通エラー処理
- カスタム例外クラスの作成

---

## フロントエンド（Next.js）

### 1. App Router の基本

- ファイルベースルーティング
- Server Component と Client Component の使い分け

### 2. 状態管理（TanStack Query）

- `useQuery` によるデータ取得
- `useMutation` による更新処理
- キャッシュの無効化（`invalidateQueries`）

### 3. フォーム処理（React Hook Form + Zod）

- スキーマベースのバリデーション
- エラーハンドリング

### 4. UI コンポーネント（shadcn/ui）

- コンポーネントの利用方法
- カスタマイズ

---

## 発展課題（オプション）

基本課題完了後、以下に挑戦することを推奨します：

| 課題 | 難易度 | 説明 |
|------|--------|------|
| フィルタリング機能 | ★☆☆ | 完了/未完了でフィルタ |
| ソート機能 | ★☆☆ | 作成日時、タイトルでソート |
| 検索機能 | ★★☆ | タイトルで検索 |
| ページネーション | ★★☆ | 大量データ対応 |
| 認証機能 | ★★★ | Spring Security + JWT |
