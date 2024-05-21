package com.eko.eko.money.dto;

import java.time.LocalDateTime;

import com.eko.eko.user.entity.User;
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
    @JsonProperty("id")
    private int budgetId;
    @JsonProperty("name")
    private String budgetName;
    @JsonProperty("money")
    private float budgetMoney;
    @JsonProperty("spend")
    private float budgetSpend;
    @JsonProperty("dateStart")
    private LocalDateTime dateStart;
    @JsonProperty("dateEnd")
    private LocalDateTime dateEnd;
    @JsonProperty("user")
    private User user;
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}
