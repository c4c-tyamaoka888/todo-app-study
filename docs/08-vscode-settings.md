# VSCode 設定ガイド

[← 目次に戻る](./README.md)

このプロジェクトでは、チーム開発を効率化するための VSCode 設定ファイルを `.vscode/` ディレクトリに配置しています。

## ファイル一覧

| ファイル | 説明 |
|----------|------|
| `extensions.json` | 推奨拡張機能の定義 |
| `settings.json` | エディタ・プロジェクト設定 |
| `launch.json` | デバッグ構成 |
| `tasks.json` | タスクランナー設定 |

---

## extensions.json（推奨拡張機能）

プロジェクトを開くと、VSCode が自動的にこれらの拡張機能をインストールするよう提案します。

```json
{
  "recommendations": [
    "vscjava.vscode-java-pack",
    "vmware.vscode-spring-boot",
    "vscjava.vscode-spring-initializr",
    "vscjava.vscode-spring-boot-dashboard",
    "ms-azuretools.vscode-docker",
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
```

### 各拡張機能の説明

| 拡張機能 | 用途 |
|----------|------|
| `vscjava.vscode-java-pack` | Java 開発の基本セット（Language Support, Debugger, Test Runner 等） |
| `vmware.vscode-spring-boot` | Spring Boot のコード補完・ナビゲーション |
| `vscjava.vscode-spring-initializr` | Spring プロジェクトの新規作成 |
| `vscjava.vscode-spring-boot-dashboard` | Spring Boot アプリの起動・停止を GUI で管理 |
| `ms-azuretools.vscode-docker` | Docker ファイルの編集・コンテナ管理 |
| `bradlc.vscode-tailwindcss` | Tailwind CSS のクラス補完 |
| `dbaeumer.vscode-eslint` | JavaScript/TypeScript の静的解析 |
| `esbenp.prettier-vscode` | コードフォーマッター |

---

## settings.json（エディタ設定）

プロジェクト固有のエディタ設定を定義します。

```json
{
  "java.configuration.updateBuildConfiguration": "automatic",
  "java.server.launchMode": "Standard",
  "spring-boot.ls.java.home": null,
  "editor.formatOnSave": true,
  "[java]": {
    "editor.defaultFormatter": "redhat.java"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.exclude": {
    "**/.git": true,
    "**/.gradle": true,
    "**/node_modules": true,
    "**/.next": true
  },
  "java.compile.nullAnalysis.mode": "automatic"
}
```

### 各設定の説明

| 設定 | 値 | 説明 |
|------|-----|------|
| `java.configuration.updateBuildConfiguration` | `"automatic"` | build.gradle 変更時に自動でプロジェクト構成を更新 |
| `java.server.launchMode` | `"Standard"` | フル機能の Language Server を使用 |
| `editor.formatOnSave` | `true` | ファイル保存時に自動フォーマット |
| `[java].editor.defaultFormatter` | `"redhat.java"` | Java ファイルは Red Hat のフォーマッターを使用 |
| `[typescript].editor.defaultFormatter` | `"esbenp.prettier-vscode"` | TypeScript は Prettier を使用 |
| `files.exclude` | `{...}` | エクスプローラーに表示しないファイル/フォルダ |
| `java.compile.nullAnalysis.mode` | `"automatic"` | Null チェックの静的解析を自動実行 |

---

## launch.json（デバッグ構成）

`F5` キーまたは「実行とデバッグ」パネルから使用できるデバッグ構成を定義します。

### 構成一覧

| 構成名 | 用途 |
|--------|------|
| Spring Boot - ローカル起動 | ローカルで Spring Boot を起動（MySQL も自動起動） |
| Spring Boot - ローカル起動（MySQLなし） | MySQL を起動せずにローカル起動 |
| Docker - リモートデバッグ | Docker 上の Spring Boot にアタッチしてデバッグ |

### 各構成の詳細

#### Spring Boot - ローカル起動

```json
{
  "type": "java",
  "name": "Spring Boot - ローカル起動",
  "request": "launch",
  "mainClass": "com.todoappserver.TodoAppServerApplication",
  "projectName": "todo-app-server",
  "cwd": "${workspaceFolder}/todo-app-server",
  "env": {
    "SPRING_PROFILES_ACTIVE": "local"
  },
  "preLaunchTask": "docker-mysql-up"
}
```

| プロパティ | 説明 |
|-----------|------|
| `type` | デバッガーの種類（Java） |
| `request` | `launch` = 新規プロセス起動 |
| `mainClass` | 起動するメインクラス |
| `env` | 環境変数（`local` プロファイルを使用） |
| `preLaunchTask` | 起動前に実行するタスク（MySQL コンテナ起動） |

#### Docker - リモートデバッグ

```json
{
  "type": "java",
  "name": "Docker - リモートデバッグ",
  "request": "attach",
  "hostName": "localhost",
  "port": 5005,
  "preLaunchTask": "docker-compose-up"
}
```

| プロパティ | 説明 |
|-----------|------|
| `request` | `attach` = 実行中のプロセスにアタッチ |
| `hostName` | 接続先ホスト |
| `port` | デバッグポート（Dockerfile で `5005` を公開） |
| `preLaunchTask` | 起動前に Docker Compose で全サービスを起動 |

---

## tasks.json（タスクランナー）

`Ctrl+Shift+P` → `Tasks: Run Task` から実行できるタスクを定義します。

### タスク一覧

| タスク名 | コマンド | 説明 |
|----------|---------|------|
| `docker-compose-up` | `docker compose up -d --build` | 全サービス起動（MySQL + API） |
| `docker-compose-down` | `docker compose down` | 全サービス停止 |
| `docker-mysql-up` | `docker compose up -d mysql` | MySQL のみ起動 |
| `docker-mysql-down` | `docker compose down mysql` | MySQL のみ停止 |
| `gradle-bootRun` | `./gradlew bootRun` | Spring Boot をローカル起動 |
| `gradle-build` | `./gradlew build` | Gradle ビルド実行 |
| `gradle-clean` | `./gradlew clean` | ビルド成果物を削除 |
| `npm-dev` | `npm run dev` | Next.js 開発サーバー起動 |
| `docker-logs-api` | `docker compose logs -f api` | API コンテナのログ表示 |
| `docker-logs-mysql` | `docker compose logs -f mysql` | MySQL コンテナのログ表示 |

### タスク構造の例

```json
{
  "label": "gradle-bootRun",
  "type": "shell",
  "command": "./gradlew bootRun",
  "options": {
    "cwd": "${workspaceFolder}/todo-app-server"
  },
  "group": {
    "kind": "build",
    "isDefault": true
  },
  "problemMatcher": [],
  "detail": "Gradleでアプリケーションを起動"
}
```

| プロパティ | 説明 |
|-----------|------|
| `label` | タスク名（launch.json の `preLaunchTask` で参照） |
| `type` | タスクの種類（`shell` = シェルコマンド） |
| `command` | 実行するコマンド |
| `options.cwd` | 作業ディレクトリ |
| `group.kind` | タスクグループ（`build` / `test`） |
| `group.isDefault` | `true` の場合、`Ctrl+Shift+B` で実行可能 |
| `detail` | タスク選択時に表示される説明 |

---

## よく使うショートカット

| ショートカット | 操作 |
|---------------|------|
| `F5` | デバッグ開始 |
| `Ctrl+Shift+B` | デフォルトビルドタスク実行 |
| `Ctrl+Shift+P` → `Tasks: Run Task` | タスク一覧から選択して実行 |
| `Ctrl+Shift+D` | デバッグパネルを開く |
