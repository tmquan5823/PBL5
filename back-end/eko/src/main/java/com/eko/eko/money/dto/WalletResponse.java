package com.eko.eko.money.dto;

import java.util.List;

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
public class WalletResponse {
    @JsonProperty("wallet_name")
    private String walletName;
    @JsonProperty("money_at_first")
    private float moneyAtFirst;
    @JsonProperty("money_left")
    private float moneyLeft;
    @JsonProperty("categories")
    private List<Category> categories;
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}
