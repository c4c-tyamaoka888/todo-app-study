# API仕様書

[← 目次に戻る](./README.md)

## エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|----------|---------------|------|
| GET | `/api/todos` | Todo一覧取得 |
| GET | `/api/todos/{id}` | Todo詳細取得 |
| POST | `/api/todos` | Todo新規作成 |
| PUT | `/api/todos/{id}` | Todo更新 |
| DELETE | `/api/todos/{id}` | Todo削除 |

## 共通仕様

### ベースURL

```
http://localhost:8080
```

### 共通レスポンスヘッダー

```
Content-Type: application/json
```

### エラーレスポンス形式

```json
{
  "timestamp": "2025-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "バリデーションエラー",
  "details": [
    {
      "field": "title",
      "message": "タイトルは必須です"
    }
  ]
}
```

---

## API詳細

### GET /api/todos - Todo一覧取得

**リクエスト**
```
GET /api/todos
```

**レスポンス（200 OK）**
```json
[
  {
    "id": 1,
    "title": "買い物に行く",
    "completed": false,
    "createdAt": "2025-01-15T10:00:00",
    "updatedAt": "2025-01-15T10:00:00"
  },
  {
    "id": 2,
    "title": "レポートを書く",
    "completed": true,
    "createdAt": "2025-01-14T09:00:00",
    "updatedAt": "2025-01-15T08:00:00"
  }
]
```

---

### GET /api/todos/{id} - Todo詳細取得

**リクエスト**
```
GET /api/todos/1
```

**レスポンス（200 OK）**
```json
{
  "id": 1,
  "title": "買い物に行く",
  "completed": false,
  "createdAt": "2025-01-15T10:00:00",
  "updatedAt": "2025-01-15T10:00:00"
}
```

**レスポンス（404 Not Found）**
```json
{
  "timestamp": "2025-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "指定されたTodoが見つかりません"
}
```

---

### POST /api/todos - Todo新規作成

**リクエスト**
```
POST /api/todos
Content-Type: application/json

{
  "title": "新しいタスク"
}
```

**リクエストボディ**

| フィールド | 型 | 必須 | バリデーション |
|-----------|-----|------|---------------|
| title | string | ○ | 1〜100文字 |

**レスポンス（201 Created）**
```json
{
  "id": 3,
  "title": "新しいタスク",
  "completed": false,
  "createdAt": "2025-01-15T11:00:00",
  "updatedAt": "2025-01-15T11:00:00"
}
```

**レスポンス（400 Bad Request）**
```json
{
  "timestamp": "2025-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "バリデーションエラー",
  "details": [
    {
      "field": "title",
      "message": "タイトルは1〜100文字で入力してください"
    }
  ]
}
```

---

### PUT /api/todos/{id} - Todo更新

**リクエスト**
```
PUT /api/todos/1
Content-Type: application/json

{
  "title": "買い物に行く（更新）",
  "completed": true
}
```

**リクエストボディ**

| フィールド | 型 | 必須 | バリデーション |
|-----------|-----|------|---------------|
| title | string | ○ | 1〜100文字 |
| completed | boolean | ○ | - |

**レスポンス（200 OK）**
```json
{
  "id": 1,
  "title": "買い物に行く（更新）",
  "completed": true,
  "createdAt": "2025-01-15T10:00:00",
  "updatedAt": "2025-01-15T12:00:00"
}
```

**レスポンス（404 Not Found）**
```json
{
  "timestamp": "2025-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "指定されたTodoが見つかりません"
}
```

---

### DELETE /api/todos/{id} - Todo削除

**リクエスト**
```
DELETE /api/todos/1
```

**レスポンス（204 No Content）**
```
（空レスポンス）
```

**レスポンス（404 Not Found）**
```json
{
  "timestamp": "2025-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "指定されたTodoが見つかりません"
}
```
