package com.eko.eko.money.dto;

import java.util.List;

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
public class ListWalletRespone {
    @JsonProperty("list_wallet")
    private List<Wallet> wallets;
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}
