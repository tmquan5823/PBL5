package com.eko.eko.money.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eko.eko.money.dto.ListWalletRespone;
import com.eko.eko.money.dto.WalletRequest;
import com.eko.eko.money.dto.WalletResponse;
import com.eko.eko.money.service.WalletService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class WalletController {
    private final WalletService service;

    @GetMapping("/all-wallets")
    public ResponseEntity<ListWalletRespone> getAllWallets(HttpServletRequest request) {
        return service.getAllWallets(request);
    }

    @PostMapping("/wallet")
    public ResponseEntity<WalletResponse> createWallet(HttpServletRequest request,
            @RequestBody WalletRequest walletRequest) {
        return service.createWallet(request, walletRequest);
    }

    @PutMapping("/wallet")
    public ResponseEntity<WalletResponse> updateWallet(HttpServletRequest request,
            @RequestBody WalletRequest walletRequest) {
        return service.updateWallet(request, walletRequest);
    }

    @DeleteMapping("/wallet/{walletId}")
    public ResponseEntity<WalletResponse> deleteWallet(HttpServletRequest request,
            @PathVariable int walletId) {
        return service.deleteWallet(request, walletId);
    }
}
