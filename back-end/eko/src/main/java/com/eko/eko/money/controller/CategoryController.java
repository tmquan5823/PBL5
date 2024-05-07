package com.eko.eko.money.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eko.eko.money.dto.ListWalletRespone;
import com.eko.eko.money.service.CategoryService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    // @GetMapping("/all-categories/{walletId}")
    // public ResponseEntity<ListWalletRespone> getAllCategories(HttpServletRequest
    // request, @PathVariable int walletId) {
    // return service.getAllCategories(request, walletId);
    // }
}
