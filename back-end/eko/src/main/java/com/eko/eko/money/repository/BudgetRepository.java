package com.eko.eko.money.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eko.eko.money.entity.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Integer> {

}
