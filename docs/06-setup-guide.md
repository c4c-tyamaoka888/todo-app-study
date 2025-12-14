# セットアップガイド

[← 目次に戻る](./README.md)

## Docker Compose で起動（推奨）

```bash
# 全サービス起動（MySQL + Spring Boot API）
docker compose up -d

# ログ確認
docker compose logs -f api

# 停止
docker compose down
```

---

## バックエンド

### ローカル起動

```bash
# MySQL のみ Docker で起動
docker compose up -d mysql

# アプリケーション起動
cd todo-app-server
./gradlew bootRun
```

### プロジェクト作成（参考）

Spring Initializr (https://start.spring.io/) で以下を選択:
- Project: Gradle - Groovy
- Language: Java
- Spring Boot: 4.0.x
- Java: 25
- Dependencies: Spring Web, Spring Data JPA, MySQL Driver, Validation

---

## フロントエンド

### ローカル起動

```bash
cd todo-app-client
npm install
npm run dev
```

### プロジェクト作成（参考）

```bash
# プロジェクト作成
npx create-next-app@latest todo-frontend --typescript --tailwind --eslint --app

# shadcn/ui セットアップ
npx shadcn@latest init

# 必要な shadcn/ui コンポーネント追加
npx shadcn@latest add button input checkbox card dialog form

# 依存関係インストール
npm install axios @tanstack/react-query react-hook-form @hookform/resolvers zod
```

---

## 設定ファイル

### docker-compose.yml

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: todo-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: todo_db
      MYSQL_USER: todo_user
      MYSQL_PASSWORD: todo_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  api:
    build:
      context: ./todo-app-server
      dockerfile: Dockerfile
    container_name: todo-api
    ports:
      - "8080:8080"
      - "5005:5005"   # デバッグポート
    environment:
      SPRING_PROFILES_ACTIVE: docker
    depends_on:
      mysql:
        condition: service_healthy

volumes:
  mysql_data:
```

### application.yml（Spring Boot）

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/todo_db
    username: todo_user
    password: todo_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

server:
  port: 8080
```

---

## VSCode でのデバッグ

### Docker リモートデバッグ

1. `docker compose up -d` でコンテナ起動
2. 実行とデバッグ → 「Docker - リモートデバッグ」を選択
3. ブレークポイントを設定してデバッグ

### ローカルデバッグ

1. `docker compose up -d mysql` で MySQL のみ起動
2. 実行とデバッグ → 「Spring Boot - ローカル起動」を選択
