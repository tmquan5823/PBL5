package com.eko.eko.money.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eko.eko.money.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    // List<Transaction> findAllByUserId(@Param("userId") int userId);

    @Query("SELECT t FROM Transaction t " +
            "JOIN t.category c " +
            "JOIN c.wallet w " +
            "WHERE w.id = :walletId")
    List<Transaction> findAllByWalletId(@Param("walletId") int walletId);

    // List<Transaction> findAllByCategoryId(@Param("categoryId") int categoryId);

    // List<Transaction> findAllByUserIdNow(@Param("userId") int userId);

    // List<Transaction> findAllByWalletIdNow(@Param("walletId") int walletId);

    // List<Transaction> findAllByCategoryIdNow(@Param("categoryId") int
    // categoryId);

    // List<Transaction> findAllByUserIdFuture(@Param("userId") int userId);

    // List<Transaction> findAllByWalletIdFuture(@Param("walletId") int walletId);

    // List<Transaction> findAllByCategoryIdFuture(@Param("categoryId") int
    // categoryId);
}
