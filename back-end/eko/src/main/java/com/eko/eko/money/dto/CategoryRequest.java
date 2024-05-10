package com.eko.eko.money.dto;

import java.util.List;

import com.eko.eko.money.entity.Transaction;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    @JsonProperty("category_id")
    private int categoryId;
    @JsonProperty("content")
    private String content;
    @JsonProperty("icon_url")
    private String iconUrl;
    @JsonProperty("icon_color")
    private String iconColor;
    @JsonProperty("is_income")
    private boolean isIncome;
}
