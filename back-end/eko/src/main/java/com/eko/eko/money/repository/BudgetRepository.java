package com.eko.eko.money.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eko.eko.money.model.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    @Query("SELECT b FROM Budget b JOIN FETCH b.user u  WHERE u.id = :userId")
    List<Budget> findAllByUserId(int userId);

    @Query("SELECT b FROM Budget b WHERE :dateToCheck BETWEEN b.dateStart AND b.dateEnd AND b.user.id = :userId")
    List<Budget> findBudgetsContainingDateByUserId(LocalDateTime dateToCheck, int userId);
}
