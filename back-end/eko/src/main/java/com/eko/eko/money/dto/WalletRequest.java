package com.eko.eko.money.dto;

import com.eko.eko.util.DTO;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WalletRequest {
    @JsonProperty("wallet_name")
    private String walletName;
    @JsonProperty("money_at_first")
    private float moneyAtFirst;

}
