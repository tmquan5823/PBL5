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

import com.eko.eko.money.dto.BudgetRequest;
import com.eko.eko.money.dto.BudgetResponse;
import com.eko.eko.money.dto.DiagramDataResponse;
import com.eko.eko.money.dto.ListBudgetResponse;
import com.eko.eko.money.service.BudgetService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class BudgetController {
    public final BudgetService service;

    @PostMapping("/budget")
    public ResponseEntity<BudgetResponse> createBudget(HttpServletRequest request,
            @RequestBody BudgetRequest budgetRequest) {
        return service.createBudget(request, budgetRequest);
    }

    @GetMapping("/budgets")
    public ResponseEntity<ListBudgetResponse> getBudgets(HttpServletRequest request) {
        return service.getBudgets(request);
    }

    @PutMapping("/budget")
    public ResponseEntity<BudgetResponse> updateBudget(HttpServletRequest request,
            @RequestBody BudgetRequest budgetRequest) {
        return service.updateBudget(request, budgetRequest);
    }

    @DeleteMapping("/budget/{budgetId}")
    public ResponseEntity<BudgetResponse> deleteBudget(HttpServletRequest request, @PathVariable int budgetId) {
        return service.deleteBudget(request, budgetId);
    }

    @GetMapping("/budget/{budgetId}")
    public ResponseEntity<BudgetResponse> getBudget(HttpServletRequest request, @PathVariable int budgetId) {
        return service.getBudget(request, budgetId);
    }

    @GetMapping("/budget/transaction/{budgetId}")
    public ResponseEntity<DiagramDataResponse> getDataDiagramBudget(HttpServletRequest request,
            @PathVariable int budgetId) {
        return service.getAllTransactionByBudgetId(request, budgetId);
    }

}
