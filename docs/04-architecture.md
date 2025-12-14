# アーキテクチャ

[← 目次に戻る](./README.md)

## レイヤー構成

```mermaid
flowchart TB
    subgraph Presentation["Presentation Layer"]
        Controller[TodoController]
        Request[TodoRequest]
        Response[TodoResponse]
    end

    subgraph Business["Business Layer"]
        Service[TodoService]
        ServiceImpl[TodoServiceImpl]
    end

    subgraph Persistence["Persistence Layer"]
        Repository[TodoRepository]
        Entity[Todo Entity]
    end

    subgraph Database["Database"]
        MySQL[(MySQL)]
    end

    Controller --> Service
    Service --> ServiceImpl
    ServiceImpl --> Repository
    Repository --> Entity
    Entity --> MySQL
```

---

## パッケージ構成

### バックエンド（Spring Boot）

```
todo-app-server/
├── build.gradle
├── settings.gradle
├── src/
│   ├── main/
│   │   ├── java/com/todoappserver/
│   │   │   ├── TodoAppServerApplication.java
│   │   │   ├── controller/
│   │   │   │   └── TodoController.java
│   │   │   ├── service/
│   │   │   │   ├── TodoService.java
│   │   │   │   └── impl/
│   │   │   │       └── TodoServiceImpl.java
│   │   │   ├── repository/
│   │   │   │   └── TodoRepository.java
│   │   │   ├── entity/
│   │   │   │   └── Todo.java
│   │   │   ├── dto/
│   │   │   │   ├── TodoRequest.java
│   │   │   │   └── TodoResponse.java
│   │   │   └── exception/
│   │   │       ├── GlobalExceptionHandler.java
│   │   │       ├── TodoNotFoundException.java
│   │   │       └── ErrorResponse.java
│   │   └── resources/
│   │       └── application.yml
│   └── test/
│       └── java/com/todoappserver/
│           ├── controller/
│           │   └── TodoControllerTest.java
│           └── service/
│               └── TodoServiceTest.java
└── Dockerfile
```

### フロントエンド（Next.js）

```
todo-app-client/
├── package.json
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                      # shadcn/ui コンポーネント
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── form.tsx
│   │   └── todo/
│   │       ├── TodoList.tsx
│   │       ├── TodoItem.tsx
│   │       ├── TodoForm.tsx
│   │       └── TodoEditDialog.tsx
│   ├── hooks/
│   │   └── useTodos.ts              # TanStack Query hooks
│   ├── lib/
│   │   ├── api.ts                   # axios インスタンス
│   │   └── utils.ts                 # shadcn/ui ユーティリティ
│   ├── schemas/
│   │   └── todo.ts                  # zod スキーマ
│   └── types/
│       └── todo.ts                  # 型定義
└── public/
```

---

## クラス図

```mermaid
classDiagram
    class TodoController {
        -TodoService todoService
        +getAllTodos() List~TodoResponse~
        +getTodoById(Long id) TodoResponse
        +createTodo(TodoRequest request) TodoResponse
        +updateTodo(Long id, TodoRequest request) TodoResponse
        +deleteTodo(Long id) void
    }

    class TodoService {
        <<interface>>
        +findAll() List~Todo~
        +findById(Long id) Todo
        +create(TodoRequest request) Todo
        +update(Long id, TodoRequest request) Todo
        +delete(Long id) void
    }

    class TodoServiceImpl {
        -TodoRepository todoRepository
        +findAll() List~Todo~
        +findById(Long id) Todo
        +create(TodoRequest request) Todo
        +update(Long id, TodoRequest request) Todo
        +delete(Long id) void
    }

    class TodoRepository {
        <<interface>>
        +findAllByOrderByCreatedAtDesc() List~Todo~
    }

    class Todo {
        -Long id
        -String title
        -Boolean completed
        -LocalDateTime createdAt
        -LocalDateTime updatedAt
    }

    class TodoRequest {
        -String title
        -Boolean completed
    }

    class TodoResponse {
        -Long id
        -String title
        -Boolean completed
        -LocalDateTime createdAt
        -LocalDateTime updatedAt
        +fromEntity(Todo todo)$ TodoResponse
    }

    class GlobalExceptionHandler {
        +handleTodoNotFoundException(TodoNotFoundException e) ErrorResponse
        +handleValidationException(MethodArgumentNotValidException e) ErrorResponse
    }

    class TodoNotFoundException {
        -String message
        +TodoNotFoundException(Long id)
    }

    class ErrorResponse {
        -LocalDateTime timestamp
        -int status
        -String error
        -String message
        -List~FieldError~ details
    }

    TodoController --> TodoService : uses
    TodoServiceImpl ..|> TodoService : implements
    TodoServiceImpl --> TodoRepository : uses
    TodoRepository --> Todo : manages
    TodoController --> TodoRequest : receives
    TodoController --> TodoResponse : returns
    TodoServiceImpl --> Todo : uses
    GlobalExceptionHandler --> TodoNotFoundException : handles
    GlobalExceptionHandler --> ErrorResponse : returns
```
