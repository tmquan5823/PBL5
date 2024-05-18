package com.eko.eko.money.dto;

import java.util.List;

import com.eko.eko.money.model.Transaction;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListAllTransactionResponse {
    @JsonProperty("list_transaction_future")
    private List<Transaction> listTransactionFuture;
    @JsonProperty("list_transaction_present")
    private List<Transaction> listTransactionPresent;
    @JsonProperty("message")
    private String message;
    @JsonProperty("state")
    private boolean state;
}
