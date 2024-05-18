package com.eko.eko.money.dto;

import java.time.Period;

import com.eko.eko.money.model.Category;
import com.eko.eko.money.model.Transaction;
import com.eko.eko.money.model.Wallet;
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
    @JsonProperty("transaction")
    private Transaction transaction;
    @JsonProperty("wallet")
    private Wallet wallet;
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}
