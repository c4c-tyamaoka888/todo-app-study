package com.todoappserver.service.impl;

import com.todoappserver.dto.TodoRequest;
import com.todoappserver.entity.Todo;
import com.todoappserver.exception.TodoNotFoundException;
import com.todoappserver.repository.TodoRepository;
import com.todoappserver.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public List<Todo> findAll() {
        return todoRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Todo findById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    @Override
    @Transactional
    public Todo create(TodoRequest request) {
        Todo todo = new Todo();
        todo.setTitle(request.getTitle());
        todo.setCompleted(false);
        return todoRepository.save(todo);
    }

    @Override
    @Transactional
    public Todo update(Long id, TodoRequest request) {
        Todo todo = findById(id);
        todo.setTitle(request.getTitle());
        if (request.getCompleted() != null) {
            todo.setCompleted(request.getCompleted());
        }
        return todoRepository.save(todo);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Todo todo = findById(id);
        todoRepository.delete(todo);
    }
}
