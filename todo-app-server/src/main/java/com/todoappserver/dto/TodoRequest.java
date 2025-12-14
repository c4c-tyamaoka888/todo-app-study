package com.todoappserver.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoRequest {

    @NotBlank(message = "タイトルは必須です")
    @Size(min = 1, max = 100, message = "タイトルは1〜100文字で入力してください")
    private String title;

    private Boolean completed;
}
