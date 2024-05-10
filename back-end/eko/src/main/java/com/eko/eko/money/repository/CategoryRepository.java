package com.eko.eko.money.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eko.eko.money.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c From Category c JOIN FETCH c.wallet w WHERE w.id= :walletId ")
    List<Category> findAllCategoriesByWalletId(@Param("walletId") int walletId);
}
