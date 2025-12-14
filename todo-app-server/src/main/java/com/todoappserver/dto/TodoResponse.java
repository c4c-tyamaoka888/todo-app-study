package com.todoappserver.dto;

import com.todoappserver.entity.Todo;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TodoResponse {

    private final Long id;
    private final String title;
    private final Boolean completed;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    private TodoResponse(Todo todo) {
        this.id = todo.getId();
        this.title = todo.getTitle();
        this.completed = todo.getCompleted();
        this.createdAt = todo.getCreatedAt();
        this.updatedAt = todo.getUpdatedAt();
    }

    public static TodoResponse fromEntity(Todo todo) {
        return new TodoResponse(todo);
    }
}
