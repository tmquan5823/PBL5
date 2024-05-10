package com.eko.eko.money.service;

import org.springframework.stereotype.Service;

import com.eko.eko.money.repository.BudgetRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;
}
