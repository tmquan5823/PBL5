package com.eko.eko.money.dto;

import java.time.LocalDateTime;
import java.time.Period;

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
public class TransactionResponse {
    @JsonProperty("category")
    private Category category;
    @JsonProperty("transaction_id")
    private int transactionId;
    @JsonProperty("transaction_date")
    private String dateTransaction;
    @JsonProperty("date_end")
    private String dateEndCycle;
    @JsonProperty("cycle")
    private Period cycle;
    @JsonProperty("amount")
    private float amount;
    @JsonProperty("note")
    private String note;
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}
