package com.eko.eko.money.dto;

import java.time.LocalDate;
import java.util.List;

import com.eko.eko.money.dto.ListCategoriesResponse.CategoryWithTransactionTimes;
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
public class DiagramDataResponse {
    @JsonProperty("list_categories")
    private List<CategoryWithTransactionTimes> categories;
    @JsonProperty("list_wallets")
    private List<Wallet> wallets;
    @JsonProperty("list_transactions")
    private List<DataDiagram> dataDiagrams;
    @JsonProperty("message")
    private String message;
    @JsonProperty("state")
    private boolean state;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DataDiagram {
        @JsonProperty("id")
        private int id;
        @JsonProperty("date_transaction")
        private LocalDate dateTransaction;
        @JsonProperty("amount")
        private float amount;
        @JsonProperty("note")
        private String note;
        @JsonProperty("wallet_id")
        private int walletId;
        @JsonProperty("category_id")
        private int categoryId;

        public DataDiagram(Transaction transaction) {
            this.id = transaction.getId();
            this.dateTransaction = transaction.getDateTransaction().toLocalDate();
            this.amount = transaction.getAmount();
            this.note = transaction.getNote();
            this.walletId = transaction.getWallet().getId();
            this.categoryId = transaction.getCategory().getId();
        }

    }
}
