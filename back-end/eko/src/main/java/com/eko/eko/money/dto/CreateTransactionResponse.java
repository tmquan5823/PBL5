package com.eko.eko.money.dto;

import java.util.List;

import com.eko.eko.money.entity.Transaction;
import com.eko.eko.money.entity.Wallet;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateTransactionResponse {
    @JsonProperty("transaction_future")
    private Transaction transactionFuture;
    @JsonProperty("list_transaction_present")
    private List<Transaction> listTransactionPresent;
    @JsonProperty("wallet")
    private Wallet wallet;
    @JsonProperty("message")
    private String message;
    @JsonProperty("state")
    private boolean state;
}
