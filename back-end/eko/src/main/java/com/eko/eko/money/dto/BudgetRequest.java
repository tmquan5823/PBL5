package com.eko.eko.money.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BudgetRequest {
    @JsonProperty("budget_id")
    private int budgetId;
    @JsonProperty("budget_name")
    private String budgetName;
    @JsonProperty("budget_money")
    private float budgetMoney;
    @JsonProperty("date_start")
    private String dateStart;
    @JsonProperty("date_end")
    private String dateEnd;
}
