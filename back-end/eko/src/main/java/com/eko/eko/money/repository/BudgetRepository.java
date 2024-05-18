package com.eko.eko.money.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eko.eko.money.model.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    @Query("SELECT b FROM Budget b JOIN FETCH b.user u  WHERE u.id = :userId")
    List<Budget> findAllByUserId(int userId);
}
