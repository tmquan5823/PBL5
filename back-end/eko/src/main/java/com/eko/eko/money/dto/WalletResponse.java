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
public class WalletResponse {
    @JsonProperty("wallet_id")
    private int walletId;
    @JsonProperty("wallet_name")
    private String walletName;
    @JsonProperty("money_at_first")
    private float moneyAtFirst;
    @JsonProperty("money_left")
    private float moneyLeft;
    @JsonProperty("user")
    private User user;
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}
