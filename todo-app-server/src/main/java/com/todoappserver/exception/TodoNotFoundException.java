package com.todoappserver.exception;

public class TodoNotFoundException extends RuntimeException {

    public TodoNotFoundException(Long id) {
        super("指定されたTodoが見つかりません: ID=" + id);
    }
}
