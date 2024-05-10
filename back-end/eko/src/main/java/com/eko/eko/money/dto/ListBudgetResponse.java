package com.eko.eko.money.dto;

import java.util.List;

import com.eko.eko.money.entity.Budget;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListBudgetResponse {
    @JsonProperty("list_budgets")
    private List<Budget> budgets;
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}
