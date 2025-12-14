package com.todoappserver.exception;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ErrorResponse {

    private final LocalDateTime timestamp;
    private final int status;
    private final String error;
    private final String message;
    private final List<FieldError> details;

    @Getter
    @Builder
    public static class FieldError {
        private final String field;
        private final String message;
    }
}
