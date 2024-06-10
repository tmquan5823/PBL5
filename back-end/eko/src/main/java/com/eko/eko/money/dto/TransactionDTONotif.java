package com.eko.eko.money.dto;

import java.time.LocalDateTime;
import java.time.Period;

import com.eko.eko.money.model.Transaction;
import com.eko.eko.money.model.Wallet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTONotif {
    private Transaction transaction;
    private Wallet wallet;

    public TransactionDTONotif(Transaction transaction) {
        this.transaction = transaction;
        this.wallet = transaction.getWallet();
    }
}
