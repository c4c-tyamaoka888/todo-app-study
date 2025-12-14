# 環境構築手順書

[← 目次に戻る](./README.md)

このドキュメントでは、Todo アプリケーションの開発環境を構築する手順を詳細に説明します。

---

## 目次

1. [前提条件](#前提条件)
2. [リポジトリのクローン](#リポジトリのクローン)
3. [バックエンド環境構築](#バックエンド環境構築)
4. [フロントエンド環境構築](#フロントエンド環境構築)
5. [アプリケーションの起動](#アプリケーションの起動)
6. [動作確認](#動作確認)
7. [トラブルシューティング](#トラブルシューティング)

---

## 前提条件

### 必要なソフトウェア

以下のソフトウェアがインストールされている必要があります。

| ソフトウェア | バージョン | 確認コマンド | インストール方法 |
|-------------|-----------|-------------|-----------------|
| Git | 2.x 以上 | `git --version` | [公式サイト](https://git-scm.com/) |
| Docker Desktop | 最新版 | `docker --version` | [公式サイト](https://www.docker.com/products/docker-desktop/) |
| Docker Compose | V2 以上 | `docker compose version` | Docker Desktop に含まれる |
| Node.js | 20.x 以上 | `node --version` | [公式サイト](https://nodejs.org/) または nvm |
| npm | 10.x 以上 | `npm --version` | Node.js に含まれる |
| Java (任意) | 25 | `java --version` | [Adoptium](https://adoptium.net/) |

> **Note**: Java はローカルでバックエンドを起動する場合のみ必要です。Docker を使う場合は不要です。

### バージョン確認

```bash
# 各ソフトウェアのバージョン確認
git --version
docker --version
docker compose version
node --version
npm --version
```

出力例：
```
git version 2.43.0
Docker version 24.0.7, build afdd53b
Docker Compose version v2.23.3
v20.10.0
10.2.3
```

### Docker Desktop の起動

Docker コマンドを実行する前に、Docker Desktop が起動していることを確認してください。

```bash
# Docker が起動しているか確認
docker info
```

エラーが出る場合は Docker Desktop を起動してください。

---

## リポジトリのクローン

### 1. リポジトリをクローン

```bash
# 任意のディレクトリに移動
cd ~/workspace

# リポジトリをクローン
git clone <リポジトリURL> todo-app-study

# プロジェクトディレクトリに移動
cd todo-app-study
```

### 2. ディレクトリ構成の確認

```bash
ls -la
```

以下のような構成になっていれば正常です：

```
todo-app-study/
├── docker-compose.yml    # Docker Compose 設定
├── docker/               # Docker 関連ファイル
│   └── mysql/
│       └── init/         # MySQL 初期化SQL
├── todo-app-server/      # Spring Boot バックエンド
├── todo-app-client/      # Next.js フロントエンド
├── docs/                 # ドキュメント
└── .vscode/              # VSCode 設定
```

---

## バックエンド環境構築

バックエンドは Docker を使用して起動します。

### 1. Docker イメージのビルドと起動

```bash
# プロジェクトルートで実行
docker compose up -d --build
```

このコマンドで以下が実行されます：
- MySQL コンテナの起動
- 初期データの投入（`docker/mysql/init/01_create_table.sql`）
- Spring Boot アプリケーションのビルドと起動

### 2. 起動状態の確認

```bash
# コンテナの状態確認
docker compose ps
```

正常な場合の出力：
```
NAME          STATUS                   PORTS
todo-api      Up About a minute        0.0.0.0:5005->5005/tcp, 0.0.0.0:8080->8080/tcp
todo-mysql    Up About a minute        0.0.0.0:3306->3306/tcp
```

### 3. ログの確認

```bash
# API サーバーのログを確認
docker compose logs -f api
```

以下のようなログが出力されていれば起動完了です：
```
Started TodoAppServerApplication in X.XXX seconds
```

`Ctrl + C` でログ表示を終了します。

### ポート一覧

| ポート | 用途 |
|-------|------|
| 3306 | MySQL データベース |
| 8080 | Spring Boot REST API |
| 5005 | Java リモートデバッグ |

---

## フロントエンド環境構築

### 1. クライアントディレクトリに移動

```bash
cd todo-app-client
```

### 2. 依存関係のインストール

```bash
npm install
```

インストールされる主要なパッケージ：
- `next` - Next.js フレームワーク
- `react`, `react-dom` - React ライブラリ
- `@tanstack/react-query` - サーバー状態管理
- `axios` - HTTP クライアント
- `react-hook-form` - フォーム管理
- `zod` - バリデーション
- `tailwindcss` - CSS フレームワーク

### 3. 開発サーバーの起動

```bash
npm run dev
```

以下のような出力が表示されます：
```
▲ Next.js 16.x.x
- Local:        http://localhost:3000
- Environments: .env.local

✓ Starting...
✓ Ready in X.Xs
```

---

## アプリケーションの起動

### 全体の起動手順（まとめ）

```bash
# ターミナル 1: バックエンド起動
cd todo-app-study
docker compose up -d --build

# ターミナル 2: フロントエンド起動
cd todo-app-study/todo-app-client
npm install  # 初回のみ
npm run dev
```

### アクセス URL

| サービス | URL |
|---------|-----|
| フロントエンド | http://localhost:3000 |
| バックエンド API | http://localhost:8080/api/todos |

---

## 動作確認

### 1. バックエンド API の確認

```bash
# Todo 一覧取得
curl http://localhost:8080/api/todos
```

正常なレスポンス例：
```json
[
  {
    "id": 1,
    "title": "Spring Bootの基礎を学ぶ",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  },
  ...
]
```

### 2. フロントエンドの確認

1. ブラウザで http://localhost:3000 を開く
2. Todo アプリの画面が表示されることを確認
3. 初期データ（3件）が表示されていることを確認

### 3. CRUD 操作の確認

| 操作 | 確認方法 |
|------|---------|
| 作成 | 入力欄にタイトルを入力して追加ボタンをクリック |
| 読取 | 一覧に Todo が表示されている |
| 更新 | チェックボックスで完了/未完了を切り替え、編集ボタンでタイトル変更 |
| 削除 | 削除ボタンをクリック |

---

## トラブルシューティング

### Docker 関連

#### コンテナが起動しない

```bash
# コンテナのログを確認
docker compose logs

# コンテナを再作成
docker compose down
docker compose up -d --build
```

#### ポートが使用中

```bash
# 使用中のポートを確認（macOS/Linux）
lsof -i :8080
lsof -i :3306

# 該当プロセスを終了するか、docker-compose.yml でポートを変更
```

#### MySQL のデータをリセットしたい

```bash
# ボリュームを含めて削除
docker compose down -v

# 再起動
docker compose up -d --build
```

### フロントエンド関連

#### npm install が失敗する

```bash
# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

#### ポート 3000 が使用中

```bash
# 別のポートで起動
npm run dev -- -p 3001
```

### API 接続関連

#### CORS エラーが発生する

バックエンドの `WebConfig.java` で許可されているオリジンを確認してください。
フロントエンドが別のポートで起動している場合は、設定の更新が必要です。

```java
// WebConfig.java
.allowedOrigins("http://localhost:3000", "http://localhost:3001")
```

#### 日本語が文字化けする

MySQL の文字コード設定を確認してください。`docker-compose.yml` の MySQL コンテナに以下が設定されている必要があります：

```yaml
command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

データベースをリセットして再起動してください：
```bash
docker compose down -v
docker compose up -d --build
```

---

## 環境の停止

### フロントエンド

開発サーバーを起動しているターミナルで `Ctrl + C`

### バックエンド（Docker）

```bash
# コンテナを停止（データは保持）
docker compose stop

# コンテナを削除（データは保持）
docker compose down

# コンテナとデータを削除
docker compose down -v
```

---

## 次のステップ

- [VSCode設定ガイド](./08-vscode-settings.md) - デバッグ方法を学ぶ
- [学習ガイド](./07-learning-guide.md) - 発展課題に取り組む
