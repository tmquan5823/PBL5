package com.eko.eko.money.dto;

import java.util.List;

import com.eko.eko.money.entity.Category;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListCategoriesResponse {
    @JsonProperty("list_categories")
    private List<Category> categories;
    @JsonProperty("message")
    private String message;
    @JsonProperty("state")
    private boolean state;
}
