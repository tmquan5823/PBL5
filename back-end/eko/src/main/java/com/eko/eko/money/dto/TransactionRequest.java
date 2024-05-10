package com.eko.eko.money.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
    @JsonProperty("wallet_id")
    private int waleltId;
    @JsonProperty("category_id")
    private int categoryId;
    @JsonProperty("transaction_id")
    private int transactionId;
    @JsonProperty("transaction_date")
    private String dateTransaction;
    @JsonProperty("date_end")
    private String dateEndCycle;
    @JsonProperty("cycle")
    private String cycle;
    @JsonProperty("amount")
    private float amount;
    @JsonProperty("note")
    private String note;
}
