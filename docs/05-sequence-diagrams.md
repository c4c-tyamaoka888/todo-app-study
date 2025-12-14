# シーケンス図

[← 目次に戻る](./README.md)

## Todo一覧取得（GET /api/todos）

```mermaid
sequenceDiagram
    actor Client as クライアント
    participant Controller as TodoController
    participant Service as TodoService
    participant Repository as TodoRepository
    participant DB as MySQL

    Client->>Controller: GET /api/todos
    Controller->>Service: findAll()
    Service->>Repository: findAllByOrderByCreatedAtDesc()
    Repository->>DB: SELECT * FROM todos ORDER BY created_at DESC
    DB-->>Repository: List<Todo>
    Repository-->>Service: List<Todo>
    Service-->>Controller: List<Todo>
    Controller-->>Client: 200 OK + List<TodoResponse>
```

---

## Todo新規作成（POST /api/todos）

```mermaid
sequenceDiagram
    actor Client as クライアント
    participant Controller as TodoController
    participant Validator as Validator
    participant Service as TodoService
    participant Repository as TodoRepository
    participant DB as MySQL

    Client->>Controller: POST /api/todos + TodoRequest
    Controller->>Validator: validate(TodoRequest)

    alt バリデーションエラー
        Validator-->>Controller: ValidationException
        Controller-->>Client: 400 Bad Request + ErrorResponse
    else バリデーション成功
        Validator-->>Controller: OK
        Controller->>Service: create(TodoRequest)
        Service->>Service: Todo entity作成
        Service->>Repository: save(Todo)
        Repository->>DB: INSERT INTO todos
        DB-->>Repository: Todo (with generated id)
        Repository-->>Service: Todo
        Service-->>Controller: Todo
        Controller-->>Client: 201 Created + TodoResponse
    end
```

---

## Todo更新（PUT /api/todos/{id}）

```mermaid
sequenceDiagram
    actor Client as クライアント
    participant Controller as TodoController
    participant Validator as Validator
    participant Service as TodoService
    participant Repository as TodoRepository
    participant DB as MySQL

    Client->>Controller: PUT /api/todos/{id} + TodoRequest
    Controller->>Validator: validate(TodoRequest)

    alt バリデーションエラー
        Validator-->>Controller: ValidationException
        Controller-->>Client: 400 Bad Request + ErrorResponse
    else バリデーション成功
        Validator-->>Controller: OK
        Controller->>Service: update(id, TodoRequest)
        Service->>Repository: findById(id)
        Repository->>DB: SELECT * FROM todos WHERE id = ?

        alt Todoが存在しない
            DB-->>Repository: empty
            Repository-->>Service: Optional.empty()
            Service-->>Controller: TodoNotFoundException
            Controller-->>Client: 404 Not Found + ErrorResponse
        else Todoが存在する
            DB-->>Repository: Todo
            Repository-->>Service: Optional<Todo>
            Service->>Service: Todoエンティティ更新
            Service->>Repository: save(Todo)
            Repository->>DB: UPDATE todos SET ... WHERE id = ?
            DB-->>Repository: Todo
            Repository-->>Service: Todo
            Service-->>Controller: Todo
            Controller-->>Client: 200 OK + TodoResponse
        end
    end
```

---

## Todo削除（DELETE /api/todos/{id}）

```mermaid
sequenceDiagram
    actor Client as クライアント
    participant Controller as TodoController
    participant Service as TodoService
    participant Repository as TodoRepository
    participant DB as MySQL

    Client->>Controller: DELETE /api/todos/{id}
    Controller->>Service: delete(id)
    Service->>Repository: findById(id)
    Repository->>DB: SELECT * FROM todos WHERE id = ?

    alt Todoが存在しない
        DB-->>Repository: empty
        Repository-->>Service: Optional.empty()
        Service-->>Controller: TodoNotFoundException
        Controller-->>Client: 404 Not Found + ErrorResponse
    else Todoが存在する
        DB-->>Repository: Todo
        Repository-->>Service: Optional<Todo>
        Service->>Repository: deleteById(id)
        Repository->>DB: DELETE FROM todos WHERE id = ?
        DB-->>Repository: OK
        Repository-->>Service: void
        Service-->>Controller: void
        Controller-->>Client: 204 No Content
    end
```

---

## フロントエンド フロー（Todo作成例）

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant Form as TodoForm
    participant RHF as React Hook Form
    participant Zod as Zod Validator
    participant Hook as useTodos Hook
    participant TQ as TanStack Query
    participant API as axios
    participant Backend as Spring Boot API

    User->>Form: タイトル入力 + 送信
    Form->>RHF: handleSubmit()
    RHF->>Zod: validate(formData)

    alt バリデーションエラー
        Zod-->>RHF: ZodError
        RHF-->>Form: errors
        Form-->>User: エラーメッセージ表示
    else バリデーション成功
        Zod-->>RHF: OK
        RHF->>Hook: createTodo(data)
        Hook->>TQ: useMutation
        TQ->>API: POST /api/todos
        API->>Backend: HTTP Request
        Backend-->>API: 201 Created
        API-->>TQ: Response
        TQ->>TQ: invalidateQueries(['todos'])
        TQ-->>Hook: Success
        Hook-->>Form: onSuccess
        Form-->>User: フォームリセット + 一覧更新
    end
```
