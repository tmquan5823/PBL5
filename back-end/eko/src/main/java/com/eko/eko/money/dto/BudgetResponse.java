package com.eko.eko.money.dto;

import com.eko.eko.user.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BudgetResponse {
    @JsonProperty("budget_id")
    private int budgetId;
    @JsonProperty("budget_name")
    private String budgetName;
    @JsonProperty("budget_money")
    private float budgetMoney;
    @JsonProperty("budget_spend")
    private float budgetSpend;
    @JsonProperty("date_start")
    private String dateStart;
    @JsonProperty("date_end")
    private String dateEnd;
    @JsonProperty("user")
    private User user;
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}
