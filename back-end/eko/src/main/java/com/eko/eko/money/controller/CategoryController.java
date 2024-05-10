package com.eko.eko.money.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eko.eko.money.dto.CategoryRequest;
import com.eko.eko.money.dto.CategoryResponse;
import com.eko.eko.money.dto.ListCategoriesResponse;

import com.eko.eko.money.service.CategoryService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @GetMapping("/categories/{walletId}")
    public ResponseEntity<ListCategoriesResponse> getAllCategories(HttpServletRequest request,
            @PathVariable int walletId) {
        return service.getAllCategories(request, walletId);
    }

    @PostMapping("/category")
    public ResponseEntity<CategoryResponse> createCategory(HttpServletRequest request,
            @RequestBody CategoryRequest categoryRequest) {
        return service.createCategory(request, categoryRequest);
    }

    @PutMapping("/category")
    public ResponseEntity<CategoryResponse> updateCategory(HttpServletRequest request,
            @RequestBody CategoryRequest categoryRequest) {
        return service.updateCategory(request, categoryRequest);
    }

}
