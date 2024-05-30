package com.eko.eko.money.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eko.eko.money.dto.CreateTransactionResponse;
import com.eko.eko.money.dto.DiagramDataResponse;
import com.eko.eko.money.dto.ListAllTransactionResponse;
import com.eko.eko.money.dto.TransactionRequest;
import com.eko.eko.money.dto.TransactionResponse;
import com.eko.eko.money.service.TransactionService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService service;

    @PostMapping("/transaction")
    public ResponseEntity<CreateTransactionResponse> createTransaction(HttpServletRequest request,
            @RequestBody TransactionRequest transactionRequest) {
        return service.createTransaction(request, transactionRequest);
    }

    @PutMapping("/transaction")
    public ResponseEntity<TransactionResponse> updateTransaction(HttpServletRequest request,
            @RequestBody TransactionRequest transactionRequest) {
        return service.updateTransaction(request, transactionRequest);
    }

    @DeleteMapping("/transaction/{transactionId}")
    public ResponseEntity<TransactionResponse> deleteTransaction(HttpServletRequest request,
            @PathVariable int transactionId) {
        return service.deleteTransaction(request, transactionId);
    }

    @GetMapping("/transactions/{walletId}")
    public ResponseEntity<ListAllTransactionResponse> getAllTransactionByWalletId(HttpServletRequest request,
            @PathVariable int walletId) {
        return service.getAllTransactionByWalletId(request, walletId);
    }

    @GetMapping("/transactions")
    public ResponseEntity<DiagramDataResponse> getDiagramDataByUserId(HttpServletRequest request) {
        return service.getDiagramDataByUserId(request);
    }

    @GetMapping("/transactions/wallet/{walletId}")
    public ResponseEntity<DiagramDataResponse> getDiagramDataByWalletId(HttpServletRequest request,
            @PathVariable int walletId) {
        return service.getDiagramDataByWalletId(request, walletId);
    }

}
