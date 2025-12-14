package com.todoappserver.service;

import com.todoappserver.dto.TodoRequest;
import com.todoappserver.entity.Todo;

import java.util.List;

public interface TodoService {

    List<Todo> findAll();

    Todo findById(Long id);

    Todo create(TodoRequest request);

    Todo update(Long id, TodoRequest request);

    void delete(Long id);
}
